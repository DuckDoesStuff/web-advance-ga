import { Module } from '@nestjs/common';
import CalculatorModule from './calculator/calculator.module';
import { KafkaModule } from './kafka/kafka.module';
import { AppController } from './app.controller';

@Module({
  imports: [CalculatorModule, KafkaModule],
  controllers: [AppController]
})
export class AppModule {}
