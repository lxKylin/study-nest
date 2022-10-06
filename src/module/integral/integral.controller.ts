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
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { IntegralService } from './integral.service';
import { CreateIntegralDto } from './dto/create-integral.dto';
import { UpdateIntegralDto } from './dto/update-integral.dto';

import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';
import { BUSINESS_ERROR_CODE } from '@/common/exceptions/business.error.codes';
import { BusinessException } from '@/common/exceptions/business.exception';

@ApiTags('年度积分模块')
@Controller('integral')
export class IntegralController {
  constructor(private readonly integralService: IntegralService) {}

  @Post()
  @ApiOperation({
    summary: '添加积分'
  })
  create(@Body() createIntegralDto: CreateIntegralDto) {
    try {
      return this.integralService.create(createIntegralDto);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '积分添加失败'
      });
    }
  }

  @Get('list')
  @ApiOperation({
    summary: '获取积分列表' // 接口描述信息
  })
  findAll(@Query() paginationsQuery: PaginationQueryDto) {
    try {
      return this.integralService.getIntegralList(paginationsQuery);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '获取积分列表失败'
      });
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: '根据id获取积分' // 接口描述信息
  })
  findOne(@Param('id') id: string) {
    try {
      return this.integralService.findOneById(+id);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '获取积分失败'
      });
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: '根据id修改积分' // 接口描述信息
  })
  update(
    @Param('id') id: string,
    @Body() updateIntegralDto: UpdateIntegralDto
  ) {
    try {
      return this.integralService.update(+id, updateIntegralDto);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '修改积分失败'
      });
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: '根据id删除轮播图' // 接口描述信息
  })
  remove(@Param('id') id: string) {
    try {
      return this.integralService.remove(+id);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '删除轮播图失败'
      });
    }
  }
}
