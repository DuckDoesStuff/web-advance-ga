import { Body, Controller, Get, Post } from '@nestjs/common';
import { KafkaService } from './kafka/kafka.service';

@Controller()
export class AppController {
  constructor(private readonly kafkaService: KafkaService) {}

  @Post('sendEvent')
  async sendEvent() {
    await this.kafkaService.sendEvent('a-event', { message: 'Hey there service-a' });
    return 'Event sent to Kafka!';
  }

  @Post('sendMessage')
  async sendMessage() {
    const response = await this.kafkaService.sendMessage('a-message', { message: 'Hey there service-a' });
    return response;
  }

  @Post('calculate')
  async caluclate(@Body() body: any) {
    const response = await this.kafkaService.caluclate(body);
    return response;
  }
}