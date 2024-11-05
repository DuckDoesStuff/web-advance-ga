import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private configService: ConfigService
  ) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const {clientToken, clientTime} = this.getTokenAndTimeFromHeader(request);
    const url = request.originalUrl;

    if (!clientToken || !clientTime) {
      return false;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const requestTime = Math.floor(new Date(clientTime as string).getTime() / 1000);
    const timeDifference = Math.abs(currentTime - requestTime);

    if (timeDifference > 60) {
      return false;
    }
    
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
