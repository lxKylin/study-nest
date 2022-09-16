import { Injectable } from '@nestjs/common';
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

  create(createAboutDto: CreateAboutDto) {
    const about = this.aboutRepository.create({ ...createAboutDto });
    return this.aboutRepository.save(about);
  }

  getAboutList(paginationsQuery: PaginationQueryDto) {
    const { limit, offset } = paginationsQuery;
    return this.aboutRepository.find({
      skip: offset,
      take: limit
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} about`;
  }

  update(id: number, updateAboutDto: UpdateAboutDto) {
    return `This action updates a #${id} about`;
  }

  remove(id: number) {
    return `This action removes a #${id} about`;
  }
}
