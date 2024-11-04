import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ActorModule } from './actor/actor.module';
import { Actor } from './actor/entities/actor.entity';
import { FilmModule } from './film/film.module';

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
      entities: [Actor],
      namingStrategy: new SnakeNamingStrategy(),
    }),
    ActorModule,
    FilmModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
