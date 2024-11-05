import { Inject, Injectable } from '@nestjs/common';
import { GetFilmsDto } from './dto/get-films.dto';
import { AxiosService } from '../axios/axios.service';
import { Request } from 'express';

@Injectable()
export class FilmService {
  constructor(
    @Inject()
    private axiosService: AxiosService
  ) {

  }

  // create(createFilmDto: CreateFilmDto) {
  //   return 'This action adds a new film';
  // }

  async findAll(req: Request) {
    const result = await this.axiosService.get(req)
    return result
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
