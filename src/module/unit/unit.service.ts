import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { Unit } from './entities/unit.entity';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';

@Injectable()
export class UnitService {
  @InjectRepository(Unit) private readonly unitRepository: Repository<Unit>;

  async create(createUnitDto: CreateUnitDto) {
    const company = await this.unitRepository.create({ ...createUnitDto });
    return await this.unitRepository.save(company);
  }

  async getPersonList(paginationsQuery: PaginationQueryDto) {
    const { limit, offset } = paginationsQuery;
    return await this.unitRepository.find({
      skip: offset,
      take: limit
    });
  }

  async findOneById(id: number) {
    return await this.unitRepository.findOneBy({ id });
  }

  async update(id: number, updateUnitDto: UpdateUnitDto) {
    const company = await this.unitRepository.preload({
      id,
      ...updateUnitDto
    });
    if (!company) {
      throw new NotFoundException(`${id} not found`);
    }
    return await this.unitRepository.save(company);
  }

  async remove(id: number) {
    const company = await this.unitRepository.findOneBy({ id });
    if (!company) {
      throw new NotFoundException(`${id} not found`);
    }
    return await this.unitRepository.remove(company);
  }
}
