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

import { UnitProductService } from '@/services/unit-product.service';
import { CreateUnitProductDto } from '@/dto/unit-product/create-unit-product.dto';
import { UpdateUnitProductDto } from '@/dto/unit-product/update-unit-product.dto';

import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';
import { BUSINESS_ERROR_CODE } from '@/common/exceptions/business.error.codes';
import { BusinessException } from '@/common/exceptions/business.exception';

@ApiTags('单位产品模块')
@Controller('unit-product')
export class UnitProductController {
  constructor(private readonly unitProductService: UnitProductService) {}

  @Post()
  @ApiOperation({
    summary: '添加单位产品'
  })
  create(@Body() createUnitProductDto: CreateUnitProductDto) {
    try {
      return this.unitProductService.create(createUnitProductDto);
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
      return this.unitProductService.getUnitProductList(paginationsQuery);
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
      return this.unitProductService.findOneById(+id);
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
  update(
    @Param('id') id: string,
    @Body() updateUnitProductDto: UpdateUnitProductDto
  ) {
    try {
      return this.unitProductService.update(+id, updateUnitProductDto);
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
      return this.unitProductService.remove(+id);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '删除单位产品失败'
      });
    }
  }
}
