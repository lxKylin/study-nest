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

import { DatasService } from '@/services/datas.service';
import { CreateDataDto } from '@/dto/datas/create-data.dto';
import { UpdateDataDto } from '@/dto/datas/update-data.dto';

import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';
import { BUSINESS_ERROR_CODE } from '@/common/exceptions/business.error.codes';
import { BusinessException } from '@/common/exceptions/business.exception';

@ApiTags('资料公开模块')
@Controller('datas')
export class DatasController {
  constructor(private readonly datasService: DatasService) {}

  @ApiOperation({
    summary: '添加资料'
  })
  @Post()
  create(@Body() createDataDto: CreateDataDto) {
    try {
      return this.datasService.create(createDataDto);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: 'data添加失败'
      });
    }
  }

  @Get('list')
  @ApiOperation({
    summary: '获取data列表' // 接口描述信息
  })
  findAll(@Query() paginationsQuery: PaginationQueryDto) {
    try {
      return this.datasService.getDataList(paginationsQuery);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '获取data列表失败'
      });
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: '根据id获取data' // 接口描述信息
  })
  findOne(@Param('id') id: string) {
    try {
      return this.datasService.findOneById(+id);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '获取data失败'
      });
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: '根据id修改data' // 接口描述信息
  })
  update(@Param('id') id: string, @Body() updateDataDto: UpdateDataDto) {
    try {
      return this.datasService.update(+id, updateDataDto);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '修改data失败'
      });
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: '根据id删除data' // 接口描述信息
  })
  remove(@Param('id') id: string) {
    try {
      return this.datasService.remove(+id);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '删除data失败'
      });
    }
  }
}
