import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    skipMissingProperties: false, // forbid missing fields
    forbidNonWhitelisted: true,  // forbid redundant fields
    transform: true
  }));

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
