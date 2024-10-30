import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';

// For depedency injection
@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}