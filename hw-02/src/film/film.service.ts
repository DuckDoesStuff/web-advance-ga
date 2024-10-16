import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { Repository } from 'typeorm';
import { GetFilmsDto } from './dto/get-films.dto';
import { Language } from '../language/entities/language.entity';
import { GetActorFilms } from './dto/get-actor-films.dto';
import { Actor } from '../actor/entities/actor.entity';
import { FilmActor } from './dto/film-actor.dto';
import AppException from '../utils/app.exception';

@Injectable()
export class FilmService {
  constructor(
    @InjectRepository(Film)
    private filmRepository: Repository<Film>,
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
    @InjectRepository(Actor)
    private actorRepository: Repository<Actor>,
  ) {}

  async create(createFilmDto: CreateFilmDto) {
    const language = await this.languageRepository.findOneBy({
      name: createFilmDto.language,
    });
    if (!language) {
      throw new AppException(
        `language: ${createFilmDto.language} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    const originalLanguage = await this.languageRepository.findOneBy({
      name: createFilmDto.originalLanguage,
    });
    if (!originalLanguage) {
      throw new AppException(
        `originalLanguage: ${createFilmDto.originalLanguage} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    const film = this.filmRepository.create({
      title: createFilmDto.title,
      description: createFilmDto.description,
      releaseYear: createFilmDto.releaseYear,
      length: createFilmDto.length,
      language: language,
      originalLanguage: originalLanguage,
      rating: createFilmDto.rating,
      specialFeatures: createFilmDto.specialFeatures,
    });
    return this.filmRepository.save(film);
  }

  findAll(query: GetFilmsDto) {
    const { cate, lang, title, limit, offset } = query;

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

    limit ? qb.take(limit) : qb.take(5);
    offset ? qb.skip(offset) : qb.skip(0);

    return qb.getMany();
  }

  findOne(id: number) {
    return this.filmRepository.findBy({ filmId: id });
  }

  findByActor(query: GetActorFilms) {
    const { firstName, lastName } = query;

    const qb = this.filmRepository
      .createQueryBuilder('film')
      .leftJoinAndSelect('film.actors', 'actor');

    qb.andWhere('actor.firstName = :firstName', { firstName }).andWhere(
      'actor.lastName = :lastName',
      { lastName },
    );

    return qb.getMany();
  }

  async update(id: number, updateFilmDto: UpdateFilmDto) {
    let film = await this.filmRepository.findOneBy({ filmId: id });
    if (!film) {
      throw new AppException(
        `Film not found with id: ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    let language = film.language;
    let originalLanguage = film.originalLanguage;

    if (updateFilmDto.language) {
      language = await this.languageRepository.findOneBy({ name: 'English' });

      if (!language) {
        throw new AppException(
          `language: ${updateFilmDto.language} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
    }

    if (updateFilmDto.originalLanguage) {
      originalLanguage = await this.languageRepository.findOneBy({name: 'English'});
      if (!originalLanguage) {
        throw new AppException(
          `originalLanguage: ${updateFilmDto.originalLanguage} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
    }

    film = {
      ...film,
      ...updateFilmDto,
      language,
      originalLanguage,
    };
    return this.filmRepository.save(film);
  }

  async remove(filmId: number) {
    if(!await this.filmRepository.findOneBy({filmId}))
      throw new AppException(
        `Film not found with id: ${filmId}`,
        HttpStatus.NOT_FOUND
      )
    return this.filmRepository.delete({ filmId });
  }

  async addActorToFilm(query: FilmActor) {
    const { actorId, filmId } = query;

    const actor = await this.actorRepository.findOneBy({ actorId });
    if(!actor) throw new AppException(
        `Actor not found with id: ${actorId}`,
        HttpStatus.NOT_FOUND
      )

    const film = await this.filmRepository.findOne({
      where: { filmId },
      relations: {
        actors: true,
      },
    });

    if(!film) throw new AppException(
      `Film not found with id: ${filmId}`,
      HttpStatus.NOT_FOUND
    )

    if (film.actors.some((a) => a.actorId === actor.actorId)) {
      // Do something here
      return {
        code: HttpStatus.FORBIDDEN,
        message: 'Actor already in this film',
      };
    }

    film.actors.push(actor);
    return await this.filmRepository.save(film);
  }

  async removeActorFromFilm(query: FilmActor) {
    const { actorId, filmId } = query;

    const actor = await this.actorRepository.findOneBy({ actorId });
    if(!actor) throw new AppException(
        `Actor not found with id: ${actorId}`,
        HttpStatus.NOT_FOUND
      )

    const film = await this.filmRepository.findOne({
      where: { filmId },
      relations: {
        actors: true,
      },
    });

    if(!film) throw new AppException(
      `Film not found with id: ${filmId}`,
      HttpStatus.NOT_FOUND
    )
    if (!film.actors.some((a) => a.actorId === actor.actorId)) {
      // Do something here
      return {
        code: HttpStatus.FORBIDDEN,
        message: 'Actor not in this film',
      };
    }

    film.actors = film.actors.filter((a) => {
      return a.actorId !== actor.actorId;
    });

    return await this.filmRepository.save(film);
  }
}
