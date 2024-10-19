import { Module } from '@nestjs/common';
import { ActorService } from './actor.service';
import { ActorController } from './actor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actor } from './entities/actor.entity';
import { Film } from '../film/entities/film.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Actor, Film
  ])],
  controllers: [ActorController],
  providers: [ActorService],
})
export class ActorModule {}
