import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { FilmService } from './film.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { GetFilmsDto } from './dto/get-films.dto';
import { GetActorFilms } from './dto/get-actor-films.dto';
import { FilmActor } from './dto/film-actor.dto';

@Controller('film')
@UseInterceptors(ClassSerializerInterceptor)
export class FilmController {
  constructor(private readonly filmService: FilmService) {}

  @Post()
  create(@Body() createFilmDto: CreateFilmDto) {
    return this.filmService.create(createFilmDto);
  }

  @Get()
  findAll(@Query() query: GetFilmsDto) {
    return this.filmService.findAll(query);
  }

  @Get("/actor")
  findByActor(@Query() query: GetActorFilms) {
    return this.filmService.findByActor(query);
  }

  @Post("/actor")
  addActorToFilm(@Query() query: FilmActor) {
    return this.filmService.addActorToFilm(query);
  }

  @Delete("/actor")
  removeActorFromFilm(@Query() query: FilmActor) {
    return this.filmService.removeActorFromFilm(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filmService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFilmDto: UpdateFilmDto) {
    return this.filmService.update(+id, updateFilmDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filmService.remove(+id);
  }
}
