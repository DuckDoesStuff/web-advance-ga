import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Token } from './entities/token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Auth, Token
    ])
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
