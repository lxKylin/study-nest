import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateNewsBannerDto } from '../dto/news-banner/create-news-banner.dto';
import { UpdateNewsBannerDto } from '../dto/news-banner/update-news-banner.dto';
import { NewsBanner } from '../entities/news-banner.entity';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';

@Injectable()
export class NewsBannerService {
  constructor(
    @InjectRepository(NewsBanner)
    private readonly newsBannerRepository: Repository<NewsBanner>
  ) {}

  async create(createNewsBannerDto: CreateNewsBannerDto) {
    const banner = await this.newsBannerRepository.create({
      ...createNewsBannerDto
    });
    return await this.newsBannerRepository.save(banner);
  }

  async getHomeBannerList(paginationsQuery: PaginationQueryDto) {
    const { limit, offset } = paginationsQuery;
    return await this.newsBannerRepository.find({
      skip: offset,
      take: limit
    });
  }

  async findOneById(id: number) {
    return await this.newsBannerRepository.findOneBy({ id });
  }

  async update(id: number, updateNewsBannerDto: UpdateNewsBannerDto) {
    const banner = await this.newsBannerRepository.preload({
      id,
      ...updateNewsBannerDto
    });
    if (!banner) {
      throw new NotFoundException(`${id} not found`);
    }
    return await this.newsBannerRepository.save(banner);
  }

  async remove(id: number) {
    const banner = await this.newsBannerRepository.findOneBy({ id });
    if (!banner) {
      throw new NotFoundException(`${id} not found`);
    }
    return await this.newsBannerRepository.remove(banner);
  }
}
