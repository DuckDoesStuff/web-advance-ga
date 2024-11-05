import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FilmService } from './film.service';
import { GetFilmsDto } from './dto/get-films.dto';

@Controller('films')
export class FilmController {
  constructor(private readonly filmService: FilmService) {}

  // @Post()
  // create(@Body() createFilmDto: CreateFilmDto) {
  //   return this.filmService.create(createFilmDto);
  // }

  @Get()
  findAll(@Query() query: GetFilmsDto) {
    return this.filmService.findAll(query);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.filmService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFilmDto: UpdateFilmDto) {
  //   return this.filmService.update(+id, updateFilmDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.filmService.remove(+id);
  // }
}
