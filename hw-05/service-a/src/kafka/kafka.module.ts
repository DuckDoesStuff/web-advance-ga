import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { KafkaService } from './kafka.service';
import { KafkaController } from './kafka.controller';
import { kafkaOptions } from '../kafka.options';
import CalculatorService from '../calculator/calculator.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        ...kafkaOptions
      },
    ]),
  ],
  controllers: [KafkaController],
  providers: [KafkaService, CalculatorService],
	exports: [KafkaService]
})
export class KafkaModule {}
