import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { Token } from './entities/token.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    @InjectRepository(Token)
  private tokenRepository: Repository<Token>,
    @Inject()
    private jwtService: JwtService
  ) {}

  async createAccount(data: RegisterDto) {
    const existed = await this.authRepository.findOneBy({
      username: data.username,
    });

    if (existed) {
      throw new HttpException(
        { error: "User with this username already exists" },
        HttpStatus.BAD_REQUEST
      );
    }

    return await this.authRepository.save(
      this.authRepository.create({
        username: data.username,
        password: data.password,
      }),
    );
  }

  async validateCredential(data: LoginDto) {
		const user = await this.authRepository.findOneBy({
			username: data.username
		})

		if (!user) {
      throw new HttpException(
        {error: "Username doesn't exist"},
        HttpStatus.BAD_REQUEST
      )
    }

		if (user.password != data.password)
      throw new HttpException(
        {error: "Username or password is incorrect"},
        HttpStatus.BAD_REQUEST
      )
    
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
}
