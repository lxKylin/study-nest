import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateHomeBannerDto } from '@/dto/home-banner/create-home-banner.dto';
import { UpdateHomeBannerDto } from '@/dto/home-banner/update-home-banner.dto';
import { HomeBanner } from '@/entities/home-banner.entity';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';

@Injectable()
export class HomeBannerService {
  constructor(
    @InjectRepository(HomeBanner)
    private readonly homeBannerRepository: Repository<HomeBanner>
  ) {}

  async create(createHomeBannerDto: CreateHomeBannerDto) {
    const banner = await this.homeBannerRepository.create({
      ...createHomeBannerDto
    });
    return await this.homeBannerRepository.save(banner);
  }

  async getHomeBannerList(paginationsQuery: PaginationQueryDto) {
    const { limit, offset } = paginationsQuery;
    return await this.homeBannerRepository.find({
      skip: offset,
      take: limit
    });
  }

  async findOneById(id: number) {
    return await this.homeBannerRepository.findOneBy({ id });
  }

  async update(id: number, updateHomeBannerDto: UpdateHomeBannerDto) {
    const banner = await this.homeBannerRepository.preload({
      id,
      ...updateHomeBannerDto
    });
    if (!banner) {
      throw new NotFoundException(`${id} not found`);
    }
    return await this.homeBannerRepository.save(banner);
  }

  async remove(id: number) {
    const banner = await this.homeBannerRepository.findOneBy({ id });
    if (!banner) {
      throw new NotFoundException(`${id} not found`);
    }
    return await this.homeBannerRepository.remove(banner);
  }
}
