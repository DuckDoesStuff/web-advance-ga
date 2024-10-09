import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from './entities/actor.entity';
import { Repository } from 'typeorm';
import { ActorException } from 'src/lib/filters/exceptions/actor.exception';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(Actor)
    private actorRepository: Repository<Actor>,
  ) {}

  create(createActorDto: CreateActorDto) {
    // Just so we can receive the fields in @BeforeInsert and @BeforeUpdate being changed
    return this.actorRepository.save(
      this.actorRepository.create(createActorDto)
    );
  }

  findAll() {
    return this.actorRepository.find();
  }

  async findOne(id: number) {
    const actor = await this.actorRepository.findOneBy({ actor_id: id });
    if (actor == null) 
      throw new ActorException(HttpStatus.NOT_FOUND, 'Actor not found');
    return actor;
  }

  async update(id: number, updateActorDto: UpdateActorDto) {
    const result = await this.actorRepository.update(id, updateActorDto);
    
    if (result.affected === 0)
      throw new ActorException(HttpStatus.NOT_FOUND, 'Actor not found');

    const updatedActor = await this.findOne(id);
    return updatedActor;
  }

  async remove(id: number) {
    const result = await this.actorRepository.delete(id);
    
    if (result.affected === 0)
      throw new ActorException(HttpStatus.NOT_FOUND, 'Actor not found');

    return { deleted: true };
  }
}
