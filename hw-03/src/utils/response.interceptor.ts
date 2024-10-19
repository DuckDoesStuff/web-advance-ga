import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import ResponseDto from '../common/api-response.dto';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler,): Observable<ResponseDto<T>> {
    return next.handle().pipe(
      map((data) => {
        if (data instanceof ResponseDto) {
          return data;
        }

        if(data.code || data.message)
          return new ResponseDto<T>(data.message, data.code, data.data);

        return new ResponseDto<T>("Success", 200, data);
      }),
    );
  }
}
