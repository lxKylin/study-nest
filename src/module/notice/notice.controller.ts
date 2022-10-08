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

import { NoticeService } from './notice.service';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';

import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';
import { BUSINESS_ERROR_CODE } from '@/common/exceptions/business.error.codes';
import { BusinessException } from '@/common/exceptions/business.exception';

@ApiTags('要闻动态模块')
@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Post()
  @ApiOperation({
    summary: '添加要闻动态'
  })
  create(@Body() createNoticeDto: CreateNoticeDto) {
    try {
      return this.noticeService.create(createNoticeDto);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '要闻动态添加失败'
      });
    }
  }

  @Get('list')
  @ApiOperation({
    summary: '获取要闻动态列表'
  })
  findAll(@Query() paginationsQuery: PaginationQueryDto) {
    try {
      return this.noticeService.getNoticeList(paginationsQuery);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '获取要闻动态列表失败'
      });
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: '根据id获得要闻动态'
  })
  findOne(@Param('id') id: string) {
    try {
      return this.noticeService.findOneById(+id);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '获取要闻动态失败'
      });
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: '根据id更新要闻动态'
  })
  update(@Param('id') id: string, @Body() updateNOticeDto: UpdateNoticeDto) {
    try {
      return this.noticeService.update(+id, updateNOticeDto);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '修改要闻动态失败'
      });
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: '根据id删除要闻动态'
  })
  remove(@Param('id') id: string) {
    try {
      return this.noticeService.remove(+id);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '删除要闻动态失败'
      });
    }
  }
}
