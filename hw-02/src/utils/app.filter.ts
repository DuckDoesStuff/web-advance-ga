import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import AppException from './app.exception';

@Catch(AppException)
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: AppException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const message = exception.getResponse();

    response
      .status(exception.responseCode ? exception.responseCode : status)
      .json({
        code: status,
				message: message
      });
  }
}
