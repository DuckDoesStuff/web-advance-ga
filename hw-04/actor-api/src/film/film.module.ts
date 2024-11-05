import { Module } from '@nestjs/common';
import { FilmService } from './film.service';
import { FilmController } from './film.controller';
import { AxiosService } from '../axios/axios.service';

@Module({
  controllers: [FilmController],
  providers: [FilmService, AxiosService],
})
export class FilmModule {}
