import { Injectable } from "@nestjs/common";
import { AddRequest, AddResponse, SubtractRequest, SubtractResponse, TestResponse } from "./dto/calculator.dto";


@Injectable()
export default class CalculatorService {
	Add(data: AddRequest): AddResponse {
		return {result: data.number1 + data.number2}
	}
	Subtract(data: SubtractRequest): SubtractResponse {
		return {result: data.number1 - data.number2}
	}
	Test(): TestResponse {
		return {message: "Hello this is a test"}
	}
	fibo(n: number) {
		if (n <= 1) return n;
		let a = 0, b = 1, temp;
		for (let i = 2; i <= n; i++) {
			temp = a + b;
			a = b;
			b = temp;
		}
		return b;
	}
}