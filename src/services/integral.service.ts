import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateIntegralDto } from '@/dto/integral/create-integral.dto';
import { UpdateIntegralDto } from '@/dto/integral/update-integral.dto';
import { Integral } from '@/entities/integral.entity';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';

@Injectable()
export class IntegralService {
  constructor(
    @InjectRepository(Integral)
    private readonly integralRepository: Repository<Integral>
  ) {}

  async create(createIntegralDto: CreateIntegralDto) {
    const integral = await this.integralRepository.create({
      ...createIntegralDto
    });
    return await this.integralRepository.save(integral);
  }

  async getIntegralList(paginationsQuery: PaginationQueryDto) {
    const { limit, offset } = paginationsQuery;
    return await this.integralRepository.find({
      skip: offset,
      take: limit
    });
  }

  async findOneById(id: number) {
    return await this.integralRepository.findOneBy({ id });
  }

  async update(id: number, updateIntegralDto: UpdateIntegralDto) {
    const integral = await this.integralRepository.preload({
      id,
      ...updateIntegralDto
    });
    if (!integral) {
      throw new NotFoundException(`${id} not found`);
    }
    return await this.integralRepository.save(integral);
  }

  async remove(id: number) {
    const integral = await this.integralRepository.findOneBy({ id });
    if (!integral) {
      throw new NotFoundException(`${id} not found`);
    }
    return await this.integralRepository.remove(integral);
  }
}
