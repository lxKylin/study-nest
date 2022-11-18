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

import { LivePreviewService } from '@/services/live-preview.service';
import { CreateLivePreviewDto } from '@/dto/live-preview/create-live-preview.dto';
import { UpdateLivePreviewDto } from '@/dto/live-preview/update-live-preview.dto';

import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';
import { BUSINESS_ERROR_CODE } from '@/common/exceptions/business.error.codes';
import { BusinessException } from '@/common/exceptions/business.exception';

@ApiTags('直播预告模块')
@Controller('live-preview')
export class LivePreviewController {
  constructor(private readonly livePreviewService: LivePreviewService) {}

  @Post()
  @ApiOperation({
    summary: '添加直播预告'
  })
  create(@Body() createLivePreviewDto: CreateLivePreviewDto) {
    try {
      return this.livePreviewService.create(createLivePreviewDto);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '直播预告添加失败'
      });
    }
  }

  @Get('list')
  @ApiOperation({
    summary: '获取直播预告列表'
  })
  findAll(@Query() paginationsQuery: PaginationQueryDto) {
    try {
      return this.livePreviewService.getLivePreviewList(paginationsQuery);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '获取直播预告列表失败'
      });
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: '根据id获得直播预告'
  })
  findOne(@Param('id') id: string) {
    try {
      return this.livePreviewService.findOneById(+id);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '获取直播预告失败'
      });
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: '根据id更新直播预告'
  })
  update(
    @Param('id') id: string,
    @Body() updateLivePreviewDto: UpdateLivePreviewDto
  ) {
    try {
      return this.livePreviewService.update(+id, updateLivePreviewDto);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '修改直播预告失败'
      });
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: '根据id删除直播预告'
  })
  remove(@Param('id') id: string) {
    try {
      return this.livePreviewService.remove(+id);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '删除直播预告失败'
      });
    }
  }
}
