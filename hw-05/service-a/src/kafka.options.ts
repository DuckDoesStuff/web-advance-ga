import { ClientOptions, Transport } from "@nestjs/microservices";


export const kafkaOptions: ClientOptions = {
	transport: Transport.KAFKA,
	options: {
		client: {
			brokers: ['localhost:9092'],
		},
		consumer: {
			groupId: 'service-a-group',
		}
	},
}