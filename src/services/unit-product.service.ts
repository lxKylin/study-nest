import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUnitProductDto } from '@/dto/unit-product/create-unit-product.dto';
import { UpdateUnitProductDto } from '@/dto/unit-product/update-unit-product.dto';
import { UnitProduct } from '@/entities/unit-product.entity';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';

@Injectable()
export class UnitProductService {
  constructor(
    @InjectRepository(UnitProduct)
    private readonly unitProductRepository: Repository<UnitProduct>
  ) {}

  async create(createUnitProductDto: CreateUnitProductDto) {
    const product = await this.unitProductRepository.create({
      ...createUnitProductDto
    });
    return await this.unitProductRepository.save(product);
  }

  async getUnitProductList(paginationsQuery: PaginationQueryDto) {
    const { limit, offset } = paginationsQuery;
    return await this.unitProductRepository.find({
      skip: offset,
      take: limit
    });
  }

  async findOneById(id: number) {
    return await this.unitProductRepository.findOneBy({ id });
  }

  async update(id: number, updateUnitProductDto: UpdateUnitProductDto) {
    const product = await this.unitProductRepository.preload({
      id,
      ...updateUnitProductDto
    });
    if (!product) {
      throw new NotFoundException(`${id} not found`);
    }
    return await this.unitProductRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.unitProductRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`${id} not found`);
    }
    return await this.unitProductRepository.remove(product);
  }
}
