import { Injectable } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { Repository } from 'typeorm';
import { GetFilmsDto } from './dto/get-films.dto';
import { Language } from '../language/entities/language.entity';
import { GetActorFilms } from './dto/get-actor-films.dto';

@Injectable()
export class FilmService {
  constructor(
    @InjectRepository(Film)
    private filmRepository: Repository<Film>,
    @InjectRepository(Language)
    private languageRepository: Repository<Language>
  ) {}

  async create(createFilmDto: CreateFilmDto) {
    const language = await this.languageRepository.findOneBy({name: createFilmDto.language})
    const originalLanguage = await this.languageRepository.findOneBy({name: createFilmDto.originalLanguage})
    
    const film = this.filmRepository.create({
      title: createFilmDto.title,
      description: createFilmDto.description,
      releaseYear: createFilmDto.releaseYear,
      length: createFilmDto.length,
      language: language,
      originalLanguage: originalLanguage,
      rating: createFilmDto.rating,
      specialFeatures: createFilmDto.specialFeatures
    });
    return this.filmRepository.save(film);
  }

  findAll(query: GetFilmsDto) {
    const {
      cate,
      lang,
      title,
      limit,
      offset,
    } = query;


    const qb = this.filmRepository
      .createQueryBuilder('film')
      .leftJoinAndSelect('film.language', 'language')
      .leftJoinAndSelect('film.categories', 'category');

    if (cate) {
      qb.andWhere('category.name = :cate', { cate });
    }

    if (lang) {
      qb.andWhere('language.name = :lang', { lang });
    }

    if (title) {
      qb.andWhere('film.title LIKE :title', { title: `%${title}%` });
    }

    limit ? qb.take(limit): qb.take(5);
    offset ? qb.skip(offset) : qb.skip(0);

    return qb.getMany();
  }

  findOne(id: number) {
    return this.filmRepository.findBy({filmId: id});
  }

  findByActor(query: GetActorFilms) {
    const {firstName, lastName} = query;

    const qb = this.filmRepository
      .createQueryBuilder('film')
      .leftJoinAndSelect('film.actors', 'actor')

    qb.andWhere('actor.firstName = :firstName', {firstName})
      .andWhere('actor.lastName = :lastName', {lastName})

    return qb.getMany();
  }

  async update(id: number, updateFilmDto: UpdateFilmDto) {
    let film = await this.filmRepository.findOneBy({filmId: id});

    let language = film.language; 
    let originalLanguage = film.originalLanguage;

    if (updateFilmDto.language)
      language = await this.languageRepository.findOneBy({name: "English"});
    if (updateFilmDto.originalLanguage)
      originalLanguage = await this.languageRepository.findOneBy({name: "English"});

    film = {
      ...film,
      ...updateFilmDto,
      language,
      originalLanguage
    }
    return this.filmRepository.save(film);
  }

  remove(id: number) {
    return this.filmRepository.delete({filmId: id})
  }
}
