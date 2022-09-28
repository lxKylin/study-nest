import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import { CreateAboutDto } from './dto/create-about.dto';
import { UpdateAboutDto } from './dto/update-about.dto';
import { About } from './entities/about.entity';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';

@Injectable()
export class AboutService {
  constructor(
    @InjectRepository(About)
    private readonly aboutRepository: Repository<About>
  ) {}

  async create(createAboutDto: CreateAboutDto) {
    const about = await this.aboutRepository.create({ ...createAboutDto });
    return await this.aboutRepository.save(about);
  }

  async getAboutList(paginationsQuery: PaginationQueryDto) {
    const { limit, offset } = paginationsQuery;
    return await this.aboutRepository.find({
      skip: offset,
      take: limit
    });
  }

  async findOneById(id: number) {
    return await this.aboutRepository.findOneBy({ id });
  }

  async update(id: number, updateAboutDto: UpdateAboutDto) {
    const about = await this.aboutRepository.preload({ id, ...updateAboutDto });
    if (!about) {
      throw new NotFoundException(`${id} not found`);
    }
    return await this.aboutRepository.save(about);
  }

  async remove(id: number) {
    const about = await this.aboutRepository.findOneBy({ id });
    if (!about) {
      throw new NotFoundException(`${id} not found`);
    }
    return await this.aboutRepository.remove(about);
  }
}
