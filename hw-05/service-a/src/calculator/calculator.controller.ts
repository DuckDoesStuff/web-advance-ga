import { Controller, Inject } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { AddRequest, AddResponse, SubtractRequest, SubtractResponse, TestResponse } from "./dto/calculator.dto";
import CalculatorService from "./calculator.service";

@Controller()
export default class CalculatorController {
	constructor(
		@Inject()
		private readonly calculatorService: CalculatorService
	) {}

	@GrpcMethod("Calculator", "Add")
	Add(data: AddRequest): AddResponse {
		return this.calculatorService.Add(data);
	}
	@GrpcMethod("Calculator", "Subtract")
	Subtract(data: SubtractRequest): SubtractResponse {
		return this.calculatorService.Subtract(data)
	}
	@GrpcMethod("Calculator", "Test")
	Test(): TestResponse {
		return this.calculatorService.Test();
	}
}