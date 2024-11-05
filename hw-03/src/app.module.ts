import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { FilmModule } from './film/film.module';
import { ActorModule } from './actor/actor.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Actor } from './actor/entities/actor.entity';
import { Film } from './film/entities/film.entity';
import { Category } from './category/entities/category.entity';
import { Language } from './language/entities/language.entity';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AppExceptionFilter } from './utils/app.filter';
import { LoggerModule } from './utils/logger/logger.module';
import { ResponseInterceptor } from './utils/response.interceptor';
import { LoggerInterceptor } from './utils/logger/logger.interceptor';

@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'admin',
        password: 'admin123',
        database: 'root',
        // autoLoadEntities: true,
        entities: [Actor, Language, Category, Film],
        namingStrategy: new SnakeNamingStrategy(),
      }),
      LoggerModule,
      FilmModule, ActorModule
    ],
    providers: [
      {
        provide: APP_FILTER,
        useClass: AppExceptionFilter,
      },
      {
        provide: APP_INTERCEPTOR,
        useClass: ClassSerializerInterceptor
      },
      {
        provide: APP_INTERCEPTOR,
        useClass: ResponseInterceptor
      },
      {
        provide: APP_INTERCEPTOR,
        useClass: LoggerInterceptor
      }
    ],
})
export class AppModule {}
