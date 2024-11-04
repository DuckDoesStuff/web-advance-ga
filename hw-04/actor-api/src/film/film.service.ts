import { Injectable } from '@nestjs/common';
import { GetFilmsDto } from './dto/get-films.dto';

@Injectable()
export class FilmService {
  // create(createFilmDto: CreateFilmDto) {
  //   return 'This action adds a new film';
  // }

  findAll(query: GetFilmsDto) {
    return `This action returns all film`;
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
