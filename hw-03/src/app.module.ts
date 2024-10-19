import { Module } from '@nestjs/common';
import { FilmModule } from './film/film.module';
import { ActorModule } from './actor/actor.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Actor } from './actor/entities/actor.entity';
import { Film } from './film/entities/film.entity';
import { Category } from './category/entities/category.entity';
import { Language } from './language/entities/language.entity';

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
    FilmModule, ActorModule],
})
export class AppModule {}
