import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';
import { BUSINESS_ERROR_CODE } from '@/common/exceptions/business.error.codes';
import { BusinessException } from '@/common/exceptions/business.exception';

@ApiTags('个人荣誉模块')
@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  @ApiOperation({
    summary: '添加个人荣誉'
  })
  create(@Body() createPersonDto: CreatePersonDto) {
    try {
      return this.personService.create(createPersonDto);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: 'about添加失败'
      });
    }
  }

  @Get('list')
  @ApiOperation({
    summary: '获取person列表' // 接口描述信息
  })
  findAll(@Query() paginationsQuery: PaginationQueryDto) {
    try {
      return this.personService.getPersonList(paginationsQuery);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '获取person列表失败'
      });
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: '根据id获取person' // 接口描述信息
  })
  findOne(@Param('id') id: string) {
    try {
      return this.personService.findOneById(+id);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '获取person失败'
      });
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: '根据id修改person' // 接口描述信息
  })
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    try {
      return this.personService.update(+id, updatePersonDto);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '修改person失败'
      });
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: '根据id删除person' // 接口描述信息
  })
  remove(@Param('id') id: string) {
    try {
      return this.personService.remove(+id);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '删除person失败'
      });
    }
  }
}
