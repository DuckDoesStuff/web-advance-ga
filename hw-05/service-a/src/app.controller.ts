import { Controller, Get, Post } from '@nestjs/common';
import { KafkaService } from './kafka/kafka.service';

@Controller()
export class AppController {
  constructor(private readonly kafkaService: KafkaService) {}

  @Post('sendEvent')
  async sendEvent() {
    await this.kafkaService.sendEvent('b-event', { message: 'Event: Hey there b-service' });
    return 'Event sent to Kafka!';
  }

  @Post('sendMessage')
  async sendMessage() {
    const response = await this.kafkaService.sendMessage('b-message', { message: 'Message: Hey there b-service' });
    return response;
  }
}
