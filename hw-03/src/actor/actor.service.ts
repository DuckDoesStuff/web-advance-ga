import { Injectable } from '@nestjs/common';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from './entities/actor.entity';
import { Repository } from 'typeorm';
import { GetActor } from './dto/get-actors.dto';
import { Film } from '../film/entities/film.entity';
import AppException from '../utils/app.exception';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(Actor)
    private actorRepository: Repository<Actor>,
    @InjectRepository(Film)
    private filmRepository: Repository<Film>,
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

  async findOne(id: number) {
    const actor = await this.actorRepository.findOneBy({ actorId: id });
    if(!actor) throw new AppException(
      `Actor not found with id: ${id}`,
      404
    )
    return actor;
  }

  async update(id: number, updateActorDto: UpdateActorDto) {
    let exist = await this.actorRepository.existsBy({actorId: id})
    if(!exist) 
      throw new AppException(
        `Actor not found with id: ${id}`,
        404
      )
    return await this.actorRepository.update({actorId: id}, updateActorDto)
  }

  async remove(id: number) {
    let exist = await this.actorRepository.existsBy({actorId: id})
    if(!exist) 
      throw new AppException(
        `Actor not found with id: ${id}`,
        404
      )
    return this.actorRepository.delete(id);
  }

  async findAllFromFilm(filmId: number) {
    const film = await this.filmRepository.findOne({
      where: {filmId},
      relations: {
        actors: true
      }
    });
    if(!film) 
      throw new AppException(
        `Film not found with id: ${filmId}`,
        404
      )
    return film.actors;
  }
}
