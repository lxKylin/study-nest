import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateLivePreviewDto } from '@/dto/live-preview/create-live-preview.dto';
import { UpdateLivePreviewDto } from '@/dto/live-preview/update-live-preview.dto';
import { LivePreview } from '@/entities/live-preview.entity';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';

@Injectable()
export class LivePreviewService {
  constructor(
    @InjectRepository(LivePreview)
    private readonly livePreviewRepository: Repository<LivePreview>
  ) {}

  async create(createLivePreviewDto: CreateLivePreviewDto) {
    const article = await this.livePreviewRepository.create({
      ...createLivePreviewDto
    });
    return await this.livePreviewRepository.save(article);
  }

  async getLivePreviewList(paginationsQuery: PaginationQueryDto) {
    const { limit, offset } = paginationsQuery;
    return await this.livePreviewRepository.find({
      skip: offset,
      take: limit
    });
  }

  async findOneById(id: number) {
    return await this.livePreviewRepository.findOneBy({ id });
  }

  async update(id: number, updateLivePreviewDto: UpdateLivePreviewDto) {
    const article = await this.livePreviewRepository.preload({
      id,
      ...updateLivePreviewDto
    });
    if (!article) {
      throw new NotFoundException(`${id} not found`);
    }
    return await this.livePreviewRepository.save(article);
  }

  async remove(id: number) {
    const article = await this.livePreviewRepository.findOneBy({ id });
    if (!article) {
      throw new NotFoundException(`${id} not found`);
    }
    return await this.livePreviewRepository.remove(article);
  }
}
