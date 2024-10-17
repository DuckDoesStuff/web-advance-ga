import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ActorService } from './actor.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { GetActor } from './dto/get-actors.dto';
import { UpdateActorDto } from './dto/update-actor.dto';

@Controller('actor')
@ApiTags("actor")
export class ActorController {
  constructor(private readonly actorService: ActorService) {}
  
  @ApiOperation({
    summary: "Add a new actor",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Return the actor entity"
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createActorDto: CreateActorDto) {
    return this.actorService.create(createActorDto);
  }

  @ApiOperation({
    summary: "Get actors",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return array of actors"
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(@Query() query: GetActor) {
    return this.actorService.findAll(query);
  }

  @ApiOperation({
    summary: "Get actor in a film",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return array of actors"
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Film not with id not found"
  })
  @ApiQuery({
    name: "filmId",
    type: Number,
    description: "Id of film to search",
    example: 1
  })
  @HttpCode(HttpStatus.OK)
  @Get('/film')
  findAllFromFilm(@Query('filmId', ParseIntPipe) filmId: number) {
    return this.actorService.findAllFromFilm(filmId);
  }

  @ApiOperation({
    summary: "Get an actor detail",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return an actor entity"
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Actor not found"
  })
  @ApiParam({
    name: "id",
    type: Number,
    description: "Id of actor to search",
    example: 1
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.actorService.findOne(id);
  }

  @ApiOperation({
    summary: "Updates an actor detail",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully updates an actor"
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Actor with id not found"
  })
  @ApiParam({
    name: "id",
    type: Number,
    description: "Id of actor to search",
    example: 1
  })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateActorDto: UpdateActorDto) {
    return this.actorService.update(id, updateActorDto);
  }

  @ApiOperation({
    summary: "Delete an actor",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Successfully delete an actor"
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Actor with id not found"
  })
  @ApiParam({
    name: "id",
    type: Number,
    description: "Id of actor to search",
    example: 1
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.actorService.remove(id);
  }
}
