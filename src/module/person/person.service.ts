import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';

@Injectable()
export class PersonService {
  @InjectRepository(Person)
  private readonly personRepository: Repository<Person>;

  async create(createPersonDto: CreatePersonDto) {
    const person = await this.personRepository.create({ ...createPersonDto });
    return await this.personRepository.save(person);
  }

  async getPersonList(paginationsQuery: PaginationQueryDto) {
    const { limit, offset } = paginationsQuery;
    return await this.personRepository.find({
      skip: offset,
      take: limit
    });
  }

  async findOneById(id: number) {
    return await this.personRepository.findOneBy({ id });
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    const person = await this.personRepository.preload({
      id,
      ...updatePersonDto
    });
    if (!person) {
      throw new NotFoundException(`${id} not found`);
    }
    return await this.personRepository.save(person);
  }

  async remove(id: number) {
    const person = await this.personRepository.findOneBy({ id });
    if (!person) {
      throw new NotFoundException(`${id} not found`);
    }
    return await this.personRepository.remove(person);
  }
}
