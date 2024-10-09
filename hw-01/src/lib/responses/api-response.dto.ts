import { HttpStatus } from "@nestjs/common";


export default class ApiResponse<T> {
	code: number;
	result: T;

	constructor(code: HttpStatus, result: T) {
		this.code = code;
		this.result = result;
	}
}