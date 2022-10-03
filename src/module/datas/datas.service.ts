import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateDataDto } from './dto/create-data.dto';
import { UpdateDataDto } from './dto/update-data.dto';
import { Data } from './entities/data.entity';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';

@Injectable()
export class DatasService {
  @InjectRepository(Data) private readonly dataRepository: Repository<Data>;

  async create(createDataDto: CreateDataDto) {
    const data = await this.dataRepository.create({ ...createDataDto });
    return await this.dataRepository.save(data);
  }

  async getDataList(paginationsQuery: PaginationQueryDto) {
    const { limit, offset } = paginationsQuery;
    return await this.dataRepository.find({
      skip: offset,
      take: limit
    });
  }

  async findOneById(id: number) {
    return await this.dataRepository.findOneBy({ id });
  }

  async update(id: number, updatePersonDto: UpdateDataDto) {
    const data = await this.dataRepository.preload({
      id,
      ...updatePersonDto
    });
    if (!data) {
      throw new NotFoundException(`${id} not found`);
    }
    return await this.dataRepository.save(data);
  }

  async remove(id: number) {
    const data = await this.dataRepository.findOneBy({ id });
    if (!data) {
      throw new NotFoundException(`${id} not found`);
    }
    return await this.dataRepository.remove(data);
  }
}
