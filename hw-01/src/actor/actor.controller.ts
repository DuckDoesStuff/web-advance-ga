import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, HttpStatus } from '@nestjs/common';
import { ActorService } from './actor.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { ActorFilter } from 'src/lib/filters/actor.filter';
import ApiResponse from 'src/lib/responses/api-response.dto';

@Controller('actor')
@UseFilters(ActorFilter)
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Post()
  async create(@Body() createActorDto: CreateActorDto) {
    return new ApiResponse(
      HttpStatus.CREATED,
      await this.actorService.create(createActorDto)
    )
  }

  @Get()
  async findAll() {
    return new ApiResponse(
      HttpStatus.OK,
      await this.actorService.findAll()
    )
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new ApiResponse(
      HttpStatus.OK,
      await this.actorService.findOne(+id)
    )
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateActorDto: UpdateActorDto) {
    return new ApiResponse(
      HttpStatus.OK,
      await this.actorService.update(+id, updateActorDto)
    )
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new ApiResponse(
      HttpStatus.ACCEPTED,
      await this.actorService.remove(+id)
    )
  }
}
