import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Token } from './entities/token.entity';
import { Request } from 'express';

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
      console.log('User with this username already exist');
      return "User with this username already exist";
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
}
