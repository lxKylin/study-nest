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

import { UnitMomentService } from './unit-moment.service';
import { CreateUnitMomentDto } from './dto/create-unit-moment.dto';
import { UpdateUnitMomentDto } from './dto/update-unit-moment.dto';

import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';
import { BUSINESS_ERROR_CODE } from '@/common/exceptions/business.error.codes';
import { BusinessException } from '@/common/exceptions/business.exception';

@ApiTags('单位高光时刻模块')
@Controller('unit-moment')
export class UnitMomentController {
  constructor(private readonly unitMomentService: UnitMomentService) {}

  @Post()
  @ApiOperation({
    summary: '添加单位高光时刻'
  })
  create(@Body() createUnitMomentDto: CreateUnitMomentDto) {
    try {
      return this.unitMomentService.create(createUnitMomentDto);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '单位高光时刻添加失败'
      });
    }
  }

  @Get('list')
  @ApiOperation({
    summary: '获取单位高光时刻列表'
  })
  findAll(@Query() paginationsQuery: PaginationQueryDto) {
    try {
      return this.unitMomentService.getUnitMomentList(paginationsQuery);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '获取单位高光时刻列表失败'
      });
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: '根据id获得单位高光时刻'
  })
  findOne(@Param('id') id: string) {
    try {
      return this.unitMomentService.findOneById(+id);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '获取单位高光时刻失败'
      });
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: '根据id更新单位高光时刻'
  })
  update(
    @Param('id') id: string,
    @Body() updateUnitMomentDto: UpdateUnitMomentDto
  ) {
    try {
      return this.unitMomentService.update(+id, updateUnitMomentDto);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '修改单位高光时刻失败'
      });
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: '根据id删除单位高光时刻'
  })
  remove(@Param('id') id: string) {
    try {
      return this.unitMomentService.remove(+id);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '删除单位高光时刻失败'
      });
    }
  }
}
