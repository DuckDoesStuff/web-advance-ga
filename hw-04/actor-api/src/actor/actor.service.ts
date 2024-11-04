import { Injectable } from '@nestjs/common';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { GetActor } from './dto/get-actors.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Actor } from './entities/actor.entity';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(Actor)
    private actorRepository: Repository<Actor>
  ) {}

  // create(createActorDto: CreateActorDto) {
  //   return 'This action adds a new actor';
  // }

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

  async findOne(id: number) {
    const actor = await this.actorRepository.findOneBy({ actorId: id });
    return actor;
  }

  // update(id: number, updateActorDto: UpdateActorDto) {
  //   return `This action updates a #${id} actor`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} actor`;
  // }
}
