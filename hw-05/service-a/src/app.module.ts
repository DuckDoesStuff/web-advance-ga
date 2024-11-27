import { Module } from '@nestjs/common';
import CalculatorModule from './calculator/calculator.module';
import { KafkaModule } from './kafka/kafka.module';
import { AppController } from './app.controller';
import { ChatGateway } from './chat/chat.gateway';

@Module({
  imports: [
    CalculatorModule, KafkaModule
  ],
  controllers: [
    AppController
  ],
  providers: [ChatGateway]
})
export class AppModule {}
