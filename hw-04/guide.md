# Guide to Setting Up Guards in actor-api and film-api

## Setting Up JwtAuthGuard and JwtRefreshGuard in actor-api

### Step 1: Install Dependencies
Ensure you have the necessary packages installed:
```bash
npm install @nestjs/jwt
npm install @nestjs/config # If you want to read env
```

Remember to include the `JwtModule` in your `app.module.ts`:
```typescript
JwtModule.register({
	global: true,
	secret: process.env.SECRET_KEY,
	signOptions: { expiresIn: '60s' },
})
```

To read the env with `ConfigModule`, include it in your `app.module.ts`:
```typescript
ConfigModule.forRoot({
	envFilePath: ['.dev.env'],
	isGlobal: true
})

// To read use this include configService in constructor like this
constructor(private configService: ConfigService) {}

// Then use this to read from the env
this.configService.get<string>('SECRET_KEY')

```

### Step 2: Create JwtAuthGuard
Create a file named `jwt-auth.guard.ts` in your `guards` directory:
```typescript
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
  ) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.getTokenFromHeader(request);

    if (!token) return false

    try {
      const payload = this.jwtService.verify(token);
      request['user'] = payload; // To use in other service
      return true;
    } catch {
      return false;
    }
  }

  private getTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
```

### Step 3: Create Token Entity and Auth Entity
Create a file named `token.entity.ts` in your `entities` directory:
```typescript
@Entity()
export class Token {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		nullable: false
	})
	token: string;

	@Column({
		default: true
	})
	valid: Boolean;

	@ManyToOne(type => Auth, auth => auth.refreshTokens)
	auth: Auth
}
```

Create a file named `auth.entity.ts` in your `entities` directory:
```typescript
@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false
  })
  username: string;

  @Column({
    nullable: false
  })
  password: string;

  @OneToMany(type => Token, token => token.auth)
  refreshTokens: Token[]
}
```

### Step 4: Create JwtRefreshGuard (to check if the refresh token is valid)
Create a file named `jwt-refresh.guard.ts` in your `guards` directory:
```typescript
@Injectable()
export class JwtRefreshGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.getTokenFromHeader(request);

    if (!token) return false;

    try {
      const payload = this.jwtService.verify(token);
      const tokenEntity = await this.getTokenEntity(token);
      if (!tokenEntity) throw new Error("This token doesn't exist in the database");
      request['user'] = payload; // To use in other service
      return true;
    } catch(error) {
      console.log(error.message);
      return false;
    }
  }

  private async getTokenEntity(token: string) {
    return await this.tokenRepository.findOne({
      where: {
        token,
        valid: true,
      }
    })
  }

  private getTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
```

### Step 5: Apply Guards
In your controller, apply the guards to the necessary routes:
```typescript
// actor.controller.ts

@Controller('actor')
// @UseGuards(JwtAuthGuard) // Or use at controller level
export class ActorController {
	@UseGuards(JwtAuthGuard)
	@Get('actor')
	getActor() {
		// Your code here
	}

	@UseGuards(JwtRefreshGuard)
	@Post('refresh')
	refreshToken() {
		// Your code here
	}
}

// auth.controller.ts

@Controller('auth')
export class ActorController {
	@UseGuards(JwtRefreshGuard)
	@Post('refresh')
	refreshToken() {
		// Your code here
	}
}
```

### Step 6: Using JwtService in AuthService
In your `auth.service.ts`, you can use the `JwtService` to generate tokens:
```typescript
async validateCredential(data: LoginDto) {
	const user = await this.authRepository.findOneBy({
		username: data.username
	})

	if (!user) {
		console.log('No user with this username found');
		return 'No user with this username found';
	}

	if (user.password != data.password)
		return "Not authenticated"
	
	const payload = { sub: user.id, username: user.username };
	const refresh_token = await this.jwtService.signAsync(payload, {
		expiresIn: "60m"
	});
	const tokenEntity = this.tokenRepository.create({
		auth: user,
		token: refresh_token,
		valid: true
	});
	await this.tokenRepository.save(tokenEntity);
	return {
		access_token: await this.jwtService.signAsync(payload),
		refresh_token
	}
}

async refreshToken(request: Request) {
	const username = request['user'].username;
	const sub = request['user'].sub
	const payload = { sub, username };
	return {
		access_token: await this.jwtService.signAsync(payload)
	}
}
```

## Setting Up ApiKeyGuard in film-api

### Step 1: Create ApiKeyGuard
Create a file named `api-key.guard.ts` in your `guards` directory:
```typescript
@Injectable()
export class ApiKeyGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const {clientToken, clientTime} = this.getTokenAndTimeFromHeader(request);
    const url = request.originalUrl;

    if (!clientToken || !clientTime) {
      return false;
    }

		// Check time
    const currentTime = Math.floor(Date.now() / 1000);
    const requestTime = Math.floor(new Date(clientTime as string).getTime() / 1000);
    const timeDifference = Math.abs(currentTime - requestTime);

    if (timeDifference > 60) {
      return false;
    }
    
		// Check token
    const apiKey = this.configService.get<string>('API_KEY');
    const serverToken = this.generateHash(`${url}${clientTime}${apiKey}`);
    return serverToken == clientToken;
  }

	private generateHash(data: string) {
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  private getTokenAndTimeFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    const time = request.headers['time'];
    return {
      clientToken: type === 'Bearer' ? token : undefined,
      clientTime: time ? time : null
    };
  }
}
```

### Step 2: Apply Guard
In your controller, apply the guard to the necessary routes:
```typescript
@Controller('film')
export class FilmController {
	@UseGuards(ApiKeyGuard)
	@Get()
	getFilms() {
		// Your code here
	}
}
```

### Step 3: Set Environment Variable
Ensure you have the `API_KEY` set in your environment variables:
```env
API_KEY=your_api_key_here
```

