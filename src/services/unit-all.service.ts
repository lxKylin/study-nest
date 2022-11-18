import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUnitAllDto } from '@/dto/unit-all/create-unit-all.dto';
import { UpdateUnitAllDto } from '@/dto/unit-all/update-unit-all.dto';
import { UnitAll } from '@/entities/unit-all.entity';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';

@Injectable()
export class UnitAllService {
  constructor(
    @InjectRepository(UnitAll)
    private readonly unitAllRepository: Repository<UnitAll>
  ) {}

  async create(createUnitAllDto: CreateUnitAllDto) {
    const unitAll = await this.unitAllRepository.create({
      ...createUnitAllDto
    });
    return await this.unitAllRepository.save(unitAll);
  }

  async getUnitAllList(paginationsQuery: PaginationQueryDto) {
    const { limit, offset } = paginationsQuery;
    return await this.unitAllRepository.find({
      skip: offset,
      take: limit
    });
  }

  async findOneById(id: number) {
    return await this.unitAllRepository.findOneBy({ id });
  }

  async update(id: number, updateUnitAllDto: UpdateUnitAllDto) {
    const unitAll = await this.unitAllRepository.preload({
      id,
      ...updateUnitAllDto
    });
    if (!unitAll) {
      throw new NotFoundException(`${id} not found`);
    }
    return await this.unitAllRepository.save(unitAll);
  }

  async remove(id: number) {
    const unitAll = await this.unitAllRepository.findOneBy({ id });
    if (!unitAll) {
      throw new NotFoundException(`${id} not found`);
    }
    return await this.unitAllRepository.remove(unitAll);
  }
}
