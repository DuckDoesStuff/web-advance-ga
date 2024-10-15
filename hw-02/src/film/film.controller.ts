import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, ClassSerializerInterceptor, HttpStatus } from '@nestjs/common';
import { FilmService } from './film.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { GetFilmsDto } from './dto/get-films.dto';
import { GetActorFilms } from './dto/get-actor-films.dto';
import { FilmActor } from './dto/film-actor.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Film } from './entities/film.entity';

@ApiTags("film")
@Controller('film')
@UseInterceptors(ClassSerializerInterceptor)
export class FilmController {
  constructor(private readonly filmService: FilmService) {}

  @ApiOperation({
    summary: "Add a new film",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Return the film entity"
  })
  @Post()
  create(@Body() createFilmDto: CreateFilmDto) {
    return this.filmService.create(createFilmDto);
  }

  @ApiOperation({
    summary: "Get films"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return array of films"
  })
  @Get()
  findAll(@Query() query: GetFilmsDto) {
    return this.filmService.findAll(query);
  }

  @ApiOperation({
    summary: "Find film by an actor name"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return array of films by an actor"
  })
  @Get("/actor")
  findByActor(@Query() query: GetActorFilms) {
    return this.filmService.findByActor(query);
  }

  @ApiOperation({
    summary: "Add an actor to a film"
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Return film entity with list of actors"
  })
  @ApiResponse({
    status: HttpStatus.NOT_ACCEPTABLE,
    description: "Actor or film not found"
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "This actor is already in this film"
  })
  @Post("/actor")
  addActorToFilm(@Query() query: FilmActor) {
    return this.filmService.addActorToFilm(query);
  }

  @ApiOperation({
    summary: "Remove an actor from a film"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return film entity with list of actors"
  })
  @ApiResponse({
    status: HttpStatus.NOT_ACCEPTABLE,
    description: "Actor or film not found"
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "This actor is not in this film"
  })
  @Delete("/actor")
  removeActorFromFilm(@Query() query: FilmActor) {
    return this.filmService.removeActorFromFilm(query);
  }

  @ApiOperation({
    summary: "Detail of a film with id"
  })
  @ApiParam({
    name: "id",
    description: "Film id",
    example: 1,
    type: Number
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return the film entity"
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filmService.findOne(+id);
  }

  @ApiOperation({
    summary: "Update a film with id"
  })
  @ApiParam({
    name: "id",
    description: "Film id",
    example: 1,
    type: Number
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return the updated film entity"
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFilmDto: UpdateFilmDto) {
    return this.filmService.update(+id, updateFilmDto);
  }

  @ApiOperation({
    summary: "Delete a film with id",
  })
  @ApiParam({
    name: "id",
    description: "Film id",
    example: 1,
    type: Number
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully deleted"
  })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.filmService.remove(id);
  }
}
