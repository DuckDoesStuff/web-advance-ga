import { HttpException, HttpStatus } from "@nestjs/common";


export class ActorException extends HttpException {
	constructor(errorCode: HttpStatus, message: string) {
		super(message, errorCode)
	}
}