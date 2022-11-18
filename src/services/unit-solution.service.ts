import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUnitSolutionDto } from '@/dto/unit-solution/create-unit-solution.dto';
import { UpdateUnitSolutionDto } from '@/dto/unit-solution/update-unit-solution.dto';
import { UnitSolution } from '@/entities/unit-solution.entity';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';

@Injectable()
export class UnitSolutionService {
  constructor(
    @InjectRepository(UnitSolution)
    private readonly unitSolutionRepository: Repository<UnitSolution>
  ) {}

  async create(createUnitSolutionDto: CreateUnitSolutionDto) {
    const solution = await this.unitSolutionRepository.create({
      ...createUnitSolutionDto
    });
    return await this.unitSolutionRepository.save(solution);
  }

  async getUnitSolutionList(paginationsQuery: PaginationQueryDto) {
    const { limit, offset } = paginationsQuery;
    return await this.unitSolutionRepository.find({
      skip: offset,
      take: limit
    });
  }

  async findOneById(id: number) {
    return await this.unitSolutionRepository.findOneBy({ id });
  }

  async update(id: number, updateUnitSolutionDto: UpdateUnitSolutionDto) {
    const solution = await this.unitSolutionRepository.preload({
      id,
      ...updateUnitSolutionDto
    });
    if (!solution) {
      throw new NotFoundException(`${id} not found`);
    }
    return await this.unitSolutionRepository.save(solution);
  }

  async remove(id: number) {
    const solution = await this.unitSolutionRepository.findOneBy({ id });
    if (!solution) {
      throw new NotFoundException(`${id} not found`);
    }
    return await this.unitSolutionRepository.remove(solution);
  }
}
