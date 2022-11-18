import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUnitMomentDto } from '@/dto/unit-moment/create-unit-moment.dto';
import { UpdateUnitMomentDto } from '@/dto/unit-moment/update-unit-moment.dto';
import { UnitMoment } from '@/entities/unit-moment.entity';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';

@Injectable()
export class UnitMomentService {
  constructor(
    @InjectRepository(UnitMoment)
    private readonly unitMomentRepository: Repository<UnitMoment>
  ) {}

  async create(createUnitMomentDto: CreateUnitMomentDto) {
    const moment = await this.unitMomentRepository.create({
      ...createUnitMomentDto
    });
    return await this.unitMomentRepository.save(moment);
  }

  async getUnitMomentList(paginationsQuery: PaginationQueryDto) {
    const { limit, offset } = paginationsQuery;
    return await this.unitMomentRepository.find({
      skip: offset,
      take: limit
    });
  }

  async findOneById(id: number) {
    return await this.unitMomentRepository.findOneBy({ id });
  }

  async update(id: number, updateUnitMomentDto: UpdateUnitMomentDto) {
    const moment = await this.unitMomentRepository.preload({
      id,
      ...updateUnitMomentDto
    });
    if (!moment) {
      throw new NotFoundException(`${id} not found`);
    }
    return await this.unitMomentRepository.save(moment);
  }

  async remove(id: number) {
    const moment = await this.unitMomentRepository.findOneBy({ id });
    if (!moment) {
      throw new NotFoundException(`${id} not found`);
    }
    return await this.unitMomentRepository.remove(moment);
  }
}
