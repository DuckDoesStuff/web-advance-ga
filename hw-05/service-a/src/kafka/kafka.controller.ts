import { Controller, Inject } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import CalculatorService from '../calculator/calculator.service';

@Controller()
export class KafkaController {
  constructor(
    @Inject()
    private readonly calculatorService: CalculatorService
  ) {}

  @EventPattern('a-event')
  handleKafkaEvent(@Payload() message: any) {
    console.log('Received event:', message);
  }
  
  @MessagePattern("a-message")
  handleKafkaMessage(@Payload() message: any) {
    console.log('Received message: ', message)
    return {
      message: "a-service: Hey there I've received your message"
    }
  }

  @MessagePattern("a-calculate")
  handleCalculatorMessage(@Payload() message: any) {
    const {operation} = message;
    if (operation == "fibo") {
      return {
        result: this.calculatorService.fibo(message.n)
      }
    } else {
      const {number1, number2} = message;
      switch (operation) {
        case "add": return this.calculatorService.Add({number1, number2})
        case "subtract": return this.calculatorService.Subtract({number1, number2})
      }
    }
  }
}
