

export default class ResponseDto<T> {
	code?: number;
	message?: string;
	data?: T;

	constructor(message?: string, code?: number, data?: T) {
		this.message = message
		this.code = code
		this.data = data
	}
}