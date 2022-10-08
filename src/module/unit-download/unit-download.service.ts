import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUnitDownloadDto } from './dto/create-unit-download.dto';
import { UpdateUnitDownloadDto } from './dto/update-unit-download.dto';
import { UnitDownload } from './entities/unit-download.entity';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';

@Injectable()
export class UnitDownloadService {
  constructor(
    @InjectRepository(UnitDownload)
    private readonly unitDownloadRepository: Repository<UnitDownload>
  ) {}

  async create(createUnitDownloadDto: CreateUnitDownloadDto) {
    const download = await this.unitDownloadRepository.create({
      ...createUnitDownloadDto
    });
    return await this.unitDownloadRepository.save(download);
  }

  async getUnitDownloadList(paginationsQuery: PaginationQueryDto) {
    const { limit, offset } = paginationsQuery;
    return await this.unitDownloadRepository.find({
      skip: offset,
      take: limit
    });
  }

  async findOneById(id: number) {
    return await this.unitDownloadRepository.findOneBy({ id });
  }

  async update(id: number, updateUnitDownloadDto: UpdateUnitDownloadDto) {
    const download = await this.unitDownloadRepository.preload({
      id,
      ...updateUnitDownloadDto
    });
    if (!download) {
      throw new NotFoundException(`${id} not found`);
    }
    return await this.unitDownloadRepository.save(download);
  }

  async remove(id: number) {
    const download = await this.unitDownloadRepository.findOneBy({ id });
    if (!download) {
      throw new NotFoundException(`${id} not found`);
    }
    return await this.unitDownloadRepository.remove(download);
  }
}
