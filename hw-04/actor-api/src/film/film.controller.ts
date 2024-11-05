import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Request, UseGuards } from '@nestjs/common';
import { FilmService } from './film.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { GetFilmsDto } from './dto/get-films.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('films')
export class FilmController {
  constructor(private readonly filmService: FilmService) {}

  // @Post()
  // create(@Body() createFilmDto: CreateFilmDto) {
  //   return this.filmService.create(createFilmDto);
  // }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req, @Query() query: GetFilmsDto) {
    return this.filmService.findAll(req);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFilmDto: UpdateFilmDto) {
  //   return this.filmService.update(+id, updateFilmDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.filmService.remove(+id);
  // }
}
