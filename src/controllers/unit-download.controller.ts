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

import { UnitDownloadService } from '@/services/unit-download.service';
import { CreateUnitDownloadDto } from '@/dto/unit-download/create-unit-download.dto';
import { UpdateUnitDownloadDto } from '@/dto/unit-download/update-unit-download.dto';

import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';
import { BUSINESS_ERROR_CODE } from '@/common/exceptions/business.error.codes';
import { BusinessException } from '@/common/exceptions/business.exception';

@ApiTags('单位资料模块')
@Controller('unit-download')
export class UnitDownloadController {
  constructor(private readonly unitDownloadService: UnitDownloadService) {}

  @Post()
  @ApiOperation({
    summary: '添加单位资料'
  })
  create(@Body() createUnitDownloadDto: CreateUnitDownloadDto) {
    try {
      return this.unitDownloadService.create(createUnitDownloadDto);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '单位资料添加失败'
      });
    }
  }

  @Get('list')
  @ApiOperation({
    summary: '获取单位资料列表'
  })
  findAll(@Query() paginationsQuery: PaginationQueryDto) {
    try {
      return this.unitDownloadService.getUnitDownloadList(paginationsQuery);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '获取单位资料列表失败'
      });
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: '根据id获得单位资料'
  })
  findOne(@Param('id') id: string) {
    try {
      return this.unitDownloadService.findOneById(+id);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '获取单位资料失败'
      });
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: '根据id更新单位资料'
  })
  update(
    @Param('id') id: string,
    @Body() updateUnitDownloadDto: UpdateUnitDownloadDto
  ) {
    try {
      return this.unitDownloadService.update(+id, updateUnitDownloadDto);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '修改单位资料失败'
      });
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: '根据id删除单位资料'
  })
  remove(@Param('id') id: string) {
    try {
      return this.unitDownloadService.remove(+id);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '删除单位资料失败'
      });
    }
  }
}
