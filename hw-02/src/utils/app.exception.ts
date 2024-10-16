import { HttpException, HttpStatus } from "@nestjs/common"

export default class AppException extends HttpException {
	public responseCode?: HttpStatus;
	constructor(message: string, statusCode: number, responseCode = HttpStatus.OK) {
		super(message, statusCode);
		this.responseCode = responseCode;
	}
}