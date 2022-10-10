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

import { UnitAllService } from './unit-all.service';
import { CreateUnitAllDto } from './dto/create-unit-all.dto';
import { UpdateUnitAllDto } from './dto/update-unit-all.dto';

import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';
import { BUSINESS_ERROR_CODE } from '@/common/exceptions/business.error.codes';
import { BusinessException } from '@/common/exceptions/business.exception';

@ApiTags('委员单位模块')
@Controller('unit-all')
export class UnitAllController {
  constructor(private readonly unitAllService: UnitAllService) {}

  @Post()
  @ApiOperation({
    summary: '添加单位产品'
  })
  create(@Body() createUnitAllDto: CreateUnitAllDto) {
    try {
      return this.unitAllService.create(createUnitAllDto);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '单位产品添加失败'
      });
    }
  }

  @Get('list')
  @ApiOperation({
    summary: '获取单位产品列表'
  })
  findAll(@Query() paginationsQuery: PaginationQueryDto) {
    try {
      return this.unitAllService.getUnitAllList(paginationsQuery);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '获取单位产品列表失败'
      });
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: '根据id获得单位产品'
  })
  findOne(@Param('id') id: string) {
    try {
      return this.unitAllService.findOneById(+id);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '获取单位产品失败'
      });
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: '根据id更新单位产品'
  })
  update(@Param('id') id: string, @Body() updateUnitAllDto: UpdateUnitAllDto) {
    try {
      return this.unitAllService.update(+id, updateUnitAllDto);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '修改单位产品失败'
      });
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: '根据id删除单位产品'
  })
  remove(@Param('id') id: string) {
    try {
      return this.unitAllService.remove(+id);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '删除单位产品失败'
      });
    }
  }
}
