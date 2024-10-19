import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppExceptionFilter } from './utils/app.filter';
import { ResponseInterceptor } from './utils/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    skipMissingProperties: false, // forbid missing fields
    forbidNonWhitelisted: true,  // forbid redundant fields
    whitelist: true,
    transform: true,
    stopAtFirstError: true
  }));

  app.useGlobalFilters(new AppExceptionFilter());
  
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
    new ResponseInterceptor()
  );

  const config = new DocumentBuilder()
    .setTitle('API document')
    .setVersion('1.0')
    .addTag("actor")
    .addTag("film")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
