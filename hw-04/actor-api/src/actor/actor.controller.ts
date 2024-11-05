import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ActorService } from './actor.service';
import { GetActor } from './dto/get-actors.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('actors')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  // @Post()
  // create(@Body() createActorDto: CreateActorDto) {
  //   return this.actorService.create(createActorDto);
  // }

  @Get()
  findAll(@Query() query: GetActor) {
    return this.actorService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actorService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateActorDto: UpdateActorDto) {
  //   return this.actorService.update(+id, updateActorDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.actorService.remove(+id);
  // }
}
