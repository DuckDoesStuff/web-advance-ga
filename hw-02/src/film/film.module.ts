import { Module } from '@nestjs/common';
import { FilmService } from './film.service';
import { FilmController } from './film.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { Language } from 'src/language/entities/language.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Film, Language
  ])],
  controllers: [FilmController],
  providers: [FilmService],
})
export class FilmModule {}
