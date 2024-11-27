import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class KafkaService implements OnModuleDestroy, OnModuleInit {
  constructor(
		@Inject("KAFKA_SERVICE")
		private readonly kafkaClient: ClientKafka
	) {}

	onModuleInit() {
		this.kafkaClient.subscribeToResponseOf("a-message")
		this.kafkaClient.subscribeToResponseOf("a-calculate")
	}

  async sendEvent(topic: string, message: any): Promise<void> {
    this.kafkaClient.emit(topic, message);
  }

  async sendMessage(topic: string, message: any) {
    return await firstValueFrom(this.kafkaClient.send(topic, message))
  }

	async caluclate(message: any) {
		return await firstValueFrom(this.kafkaClient.send("a-calculate", message))
	}

  async onModuleDestroy() {
    await this.kafkaClient.close();
  }
}
