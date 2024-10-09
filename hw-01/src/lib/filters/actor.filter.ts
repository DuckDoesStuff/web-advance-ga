import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { ActorException } from "./exceptions/actor.exception";


@Catch(ActorException)
export class ActorFilter implements ExceptionFilter<ActorException> {
  catch(exception: ActorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
		const message = exception.getResponse();

    response
      .status(status)
      .json({
        code: status,
				message: message
      });
  }
}