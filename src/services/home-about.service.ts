import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateHomeAboutDto } from '@/dto/home-about/create-home-about.dto';
import { UpdateHomeAboutDto } from '@/dto/home-about/update-home-about.dto';
import { HomeAbout } from '@/entities/home-about.entity';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';

@Injectable()
export class HomeAboutService {
  constructor(
    @InjectRepository(HomeAbout)
    private readonly homeAboutRepository: Repository<HomeAbout>
  ) {}

  async create(createHomeAboutDto: CreateHomeAboutDto) {
    const homeAbout = await this.homeAboutRepository.create({
      ...createHomeAboutDto
    });
    return await this.homeAboutRepository.save(homeAbout);
  }

  async getHomeAboutList(paginationsQuery: PaginationQueryDto) {
    const { limit, offset } = paginationsQuery;
    return await this.homeAboutRepository.find({
      skip: offset,
      take: limit
    });
  }

  async findOneById(id: number) {
    return await this.homeAboutRepository.findOneBy({ id });
  }

  async update(id: number, updateHomeAboutDto: UpdateHomeAboutDto) {
    const homeAbout = await this.homeAboutRepository.preload({
      id,
      ...updateHomeAboutDto
    });
    if (!homeAbout) {
      throw new NotFoundException(`${id} not found`);
    }
    return await this.homeAboutRepository.save(homeAbout);
  }

  async remove(id: number) {
    const homeAbout = await this.homeAboutRepository.findOneBy({ id });
    if (!homeAbout) {
      throw new NotFoundException(`${id} not found`);
    }
    return await this.homeAboutRepository.remove(homeAbout);
  }
}
