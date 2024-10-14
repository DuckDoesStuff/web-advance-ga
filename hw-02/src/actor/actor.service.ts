import { Injectable } from '@nestjs/common';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from './entities/actor.entity';
import { Repository } from 'typeorm';
import { GetActor } from './dto/get-actors.dto';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(Actor)
    private actorRepository: Repository<Actor>,
  ) {}

  create(createActorDto: CreateActorDto) {
    return this.actorRepository.save(
      this.actorRepository.create(createActorDto)
    );
  }

  findAll(query: GetActor) {
    const { firstName, lastName, offset, limit } = query;
    const qb = this.actorRepository.createQueryBuilder('actor');

    if(firstName) 
      qb.andWhere('actor.firstName = :firstName', {firstName})
    if(lastName) 
      qb.andWhere('actor.lastName = :lastName', {lastName})

    limit ? qb.take(limit) : qb.take(5);
    offset ? qb.skip(offset) : qb.skip(0);

    return qb.getMany();
  }

  findOne(id: number) {
    return this.actorRepository.findOneBy({ actorId: id });
  }

  update(id: number, updateActorDto: UpdateActorDto) {
    return this.actorRepository.update({actorId: id}, updateActorDto)
  }

  remove(id: number) {
    return this.actorRepository.delete(id);
  }
}
