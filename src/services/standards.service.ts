import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateStandardDto } from '@/dto/standards/create-standard.dto';
import { UpdateStandardDto } from '@/dto/standards/update-standard.dto';
import { Standard } from '@/entities/standard.entity';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';

@Injectable()
export class StandardsService {
  constructor(
    @InjectRepository(Standard)
    private readonly standardRepository: Repository<Standard>
  ) {}

  async create(createStandardDto: CreateStandardDto) {
    const standard = await this.standardRepository.create({
      ...createStandardDto
    });
    return await this.standardRepository.save(standard);
  }

  async getNoticeList(paginationsQuery: PaginationQueryDto) {
    const { limit, offset } = paginationsQuery;
    return await this.standardRepository.find({
      skip: offset,
      take: limit
    });
  }

  async findOneById(id: number) {
    return await this.standardRepository.findOneBy({ id });
  }

  async update(id: number, updateStandardDto: UpdateStandardDto) {
    const standard = await this.standardRepository.preload({
      id,
      ...updateStandardDto
    });
    if (!standard) {
      throw new NotFoundException(`${id} not found`);
    }
    return await this.standardRepository.save(standard);
  }

  async remove(id: number) {
    const standard = await this.standardRepository.findOneBy({ id });
    if (!standard) {
      throw new NotFoundException(`${id} not found`);
    }
    return await this.standardRepository.remove(standard);
  }
}
