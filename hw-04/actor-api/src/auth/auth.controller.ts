import { Body, Controller, Get, Inject, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
	constructor(
		@Inject()
		private authService : AuthService
	) {}

	@Post("/register")
	register(@Body() data : RegisterDto) {
		return this.authService.createAccount(data);
	}

	@Post("/login")
	login(@Body() data : LoginDto) {
		return this.authService.validateCredential(data);
	}

	@UseGuards(JwtRefreshGuard)
	@Get("/refresh")
	refresh(@Request() req) {
		return this.authService.refreshToken(req);
	}
}
