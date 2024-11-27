import { Injectable } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { GetFilmsDto } from './dto/get-films.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilmService {
  constructor(
    @InjectRepository(Film)
    private filmRepository: Repository<Film>
  ) {}
  // create(createFilmDto: CreateFilmDto) {
  //   return 'This action adds a new film';
  // }

  async findAll(query: GetFilmsDto) {
    const { title, limit, offset } = query;

    const qb = this.filmRepository
      .createQueryBuilder('film')

    if (title) {
      qb.andWhere('film.title LIKE :title', { title: `%${title}%` });
    }

    limit ? qb.take(limit) : qb.take(5);
    offset ? qb.skip(offset) : qb.skip(0);
    return qb.getMany();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} film`;
  // }

  // update(id: number, updateFilmDto: UpdateFilmDto) {
  //   return `This action updates a #${id} film`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} film`;
  // }
}
