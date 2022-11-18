import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateNoticeDto } from '@/dto/notice/create-notice.dto';
import { UpdateNoticeDto } from '@/dto/notice/update-notice.dto';
import { Notice } from '@/entities/notice.entity';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice)
    private readonly noticeRepository: Repository<Notice>
  ) {}

  async create(createNoticeDto: CreateNoticeDto) {
    const notice = await this.noticeRepository.create({
      ...createNoticeDto
    });
    return await this.noticeRepository.save(notice);
  }

  async getNoticeList(paginationsQuery: PaginationQueryDto) {
    const { limit, offset } = paginationsQuery;
    return await this.noticeRepository.find({
      skip: offset,
      take: limit
    });
  }

  async findOneById(id: number) {
    return await this.noticeRepository.findOneBy({ id });
  }

  async update(id: number, updateNoticeDto: UpdateNoticeDto) {
    const notice = await this.noticeRepository.preload({
      id,
      ...updateNoticeDto
    });
    if (!notice) {
      throw new NotFoundException(`${id} not found`);
    }
    return await this.noticeRepository.save(notice);
  }

  async remove(id: number) {
    const notice = await this.noticeRepository.findOneBy({ id });
    if (!notice) {
      throw new NotFoundException(`${id} not found`);
    }
    return await this.noticeRepository.remove(notice);
  }
}
