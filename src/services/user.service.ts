import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import { CreateUserDto } from '@/dto/user/create-user.dto';
import { UpdateUserDto } from '@/dto/user/update-user.dto';
import { User } from '@/entities/user.entity';
import { Role } from '@/entities/role.entity';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';

import { BUSINESS_ERROR_CODE } from '@/common/exceptions/business.error.codes';
import { BusinessException } from '@/common/exceptions/business.exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ) {}

  async create(createUserDto: CreateUserDto) {
    // const user = await this.userRepository.create({ ...createUserDto });
    // return this.userRepository.save(user);
    try {
      const roles = await Promise.all(
        createUserDto.roles.map((name) => this.preloadRoleByName(name))
      );

      const user = this.userRepository.create({ ...createUserDto, roles });

      return this.userRepository.save(user);
    } catch (error) {
      console.log(error);
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '用户添加失败'
      });
    }
    // const roles = await Promise.all(
    //   createUserDto.roles.map((name) => this.preloadRoleByName(name))
    // );

    // console.log(roles, 'roles');

    // const user = this.userRepository.create({ ...createUserDto, roles });
    // console.log(user, 'user');
    // return this.userRepository.save(user);
  }

  async getUserList(paginationsQuery: PaginationQueryDto) {
    const { limit, offset } = paginationsQuery;
    return await this.userRepository.find({
      skip: offset,
      take: limit
    });
  }

  async findOneById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async findOneByUserName(username: string) {
    return await this.userRepository.findOne({
      where: { username }
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // const user = await this.userRepository.preload({
    //   id: id,
    //   ...updateUserDto
    // });
    // if (!user) {
    //   throw new NotFoundException(`${id} not found`);
    // }
    // return await this.userRepository.save(user);
    // 因为更新的每个项都是可选的，所以需要确保role一定存在
    try {
      const roles =
        updateUserDto.roles &&
        (await Promise.all(
          updateUserDto.roles.map((name) => this.preloadRoleByName(name))
        ));

      const user = await this.userRepository.preload({
        id: id,
        ...updateUserDto,
        roles
      });
      if (!user) {
        throw new NotFoundException(`${id} not found`);
      }
      return this.userRepository.save(user);
    } catch (error) {
      console.log(error);
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '用户修改失败'
      });
    }
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`${id} not found`);
    }
    return await this.userRepository.remove(user);
  }

  // 私有方法，将角色名作为入参并返回
  private async preloadRoleByName(name: string): Promise<Role> {
    const existingRole = await this.roleRepository.findOne({ where: { name } });
    if (existingRole) {
      return existingRole;
    }
    return this.roleRepository.create({ name });
  }
}
