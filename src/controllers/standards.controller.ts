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

import { StandardsService } from '@/services/standards.service';
import { CreateStandardDto } from '@/dto/standards/create-standard.dto';
import { UpdateStandardDto } from '@/dto/standards/update-standard.dto';

import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';
import { BUSINESS_ERROR_CODE } from '@/common/exceptions/business.error.codes';
import { BusinessException } from '@/common/exceptions/business.exception';

@ApiTags('标准规范模块')
@Controller('standards')
export class StandardsController {
  constructor(private readonly standardsService: StandardsService) {}

  @Post()
  @ApiOperation({
    summary: '添加标准规范'
  })
  create(@Body() createStandardDto: CreateStandardDto) {
    try {
      return this.standardsService.create(createStandardDto);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '标准规范添加失败'
      });
    }
  }

  @Get('list')
  @ApiOperation({
    summary: '获取标准规范列表'
  })
  findAll(@Query() paginationsQuery: PaginationQueryDto) {
    try {
      return this.standardsService.getNoticeList(paginationsQuery);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '获取标准规范列表失败'
      });
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: '根据id获得标准规范'
  })
  findOne(@Param('id') id: string) {
    try {
      return this.standardsService.findOneById(+id);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '获取标准规范失败'
      });
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: '根据id更新标准规范'
  })
  update(
    @Param('id') id: string,
    @Body() updateStandardDto: UpdateStandardDto
  ) {
    try {
      return this.standardsService.update(+id, updateStandardDto);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '修改标准规范失败'
      });
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: '根据id删除标准规范'
  })
  remove(@Param('id') id: string) {
    try {
      return this.standardsService.remove(+id);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '删除标准规范失败'
      });
    }
  }
}
