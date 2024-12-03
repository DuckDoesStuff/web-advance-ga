import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { Token } from '../auth/entities/token.entity';

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

    if (token === undefined) return false;

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
