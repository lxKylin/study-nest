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

import { UnitService } from './unit.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';

import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';
import { BUSINESS_ERROR_CODE } from '@/common/exceptions/business.error.codes';
import { BusinessException } from '@/common/exceptions/business.exception';

@ApiTags('公司荣誉模块')
@Controller('unit')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Post()
  @ApiOperation({
    summary: '添加公司荣誉'
  })
  create(@Body() createUnitDto: CreateUnitDto) {
    try {
      return this.unitService.create(createUnitDto);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: 'unit添加失败'
      });
    }
  }

  @Get('list')
  @ApiOperation({
    summary: '获取unit列表' // 接口描述信息
  })
  findAll(@Query() paginationsQuery: PaginationQueryDto) {
    try {
      return this.unitService.getPersonList(paginationsQuery);
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
      return this.unitService.findOneById(+id);
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
  update(@Param('id') id: string, @Body() updateUnitDto: UpdateUnitDto) {
    try {
      return this.unitService.update(+id, updateUnitDto);
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
      return this.unitService.remove(+id);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '删除person失败'
      });
    }
  }
}
