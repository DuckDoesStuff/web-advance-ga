import { Body, Controller, Inject, OnModuleInit, Post } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { AddRequest, AddResponse, SubtractRequest, SubtractResponse } from "./dto/calculator.dto";
import { Observable } from "rxjs";

interface CalculatorService {
	Add(data: AddRequest): Observable<any>;
	Subtract(data: SubtractRequest): Observable<any>;
	Test({}): Observable<any>;
}

@Controller("/calculator")
export default class CalculatorController implements OnModuleInit {
	constructor(
		@Inject("CALCULATOR_PACKAGE")
		private readonly client: ClientGrpc
	) {}

	private calculatorService: CalculatorService;

	onModuleInit() {
		this.calculatorService = this.client.getService<CalculatorService>("Calculator") 
	}
	
	@Post("/add")
	async add(@Body() data: AddRequest) {
		console.log(data)
		return await this.calculatorService.Add(data);
	}

	@Post("/subtract")
	async subtract(@Body() data: SubtractRequest) {
		return await this.calculatorService.Subtract(data);
	}

	@Post("/test")
	async test() {
		return this.calculatorService.Test(null);
	}
}