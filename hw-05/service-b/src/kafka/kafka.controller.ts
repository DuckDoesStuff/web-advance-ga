import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class KafkaController {
  @EventPattern('b-event')
  handleKafkaEvent(@Payload() message: any) {
    console.log('Received event:', message);
  }

	@MessagePattern('b-message')
	handleKafkaMessaeg(@Payload() message: any) {
		console.log('Received message: ', message)
    return {
      message: "b-service: Hey there I've received your message"
    }
	}
}
