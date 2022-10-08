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

import { NewsBannerService } from './news-banner.service';
import { CreateNewsBannerDto } from './dto/create-news-banner.dto';
import { UpdateNewsBannerDto } from './dto/update-news-banner.dto';

import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';
import { BUSINESS_ERROR_CODE } from '@/common/exceptions/business.error.codes';
import { BusinessException } from '@/common/exceptions/business.exception';

@ApiTags('要闻动态banner模块')
@Controller('news-banner')
export class NewsBannerController {
  constructor(private readonly newsBannerService: NewsBannerService) {}

  @Post()
  @ApiOperation({
    summary: '添加要闻动态banner'
  })
  create(@Body() createNewsBannerDto: CreateNewsBannerDto) {
    try {
      return this.newsBannerService.create(createNewsBannerDto);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '要闻动态banner添加失败'
      });
    }
  }

  @Get('list')
  @ApiOperation({
    summary: '获取要闻动态banner列表' // 接口描述信息
  })
  findAll(@Query() paginationsQuery: PaginationQueryDto) {
    try {
      return this.newsBannerService.getHomeBannerList(paginationsQuery);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '获取要闻动态banner列表失败'
      });
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: '根据id获取要闻动态banner' // 接口描述信息
  })
  findOne(@Param('id') id: string) {
    try {
      return this.newsBannerService.findOneById(+id);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '获取要闻动态banner失败'
      });
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: '根据id修改要闻动态banner' // 接口描述信息
  })
  update(
    @Param('id') id: string,
    @Body() updateNewsBannerDto: UpdateNewsBannerDto
  ) {
    try {
      return this.newsBannerService.update(+id, updateNewsBannerDto);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '修改要闻动态banner失败'
      });
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: '根据id删除要闻动态banner' // 接口描述信息
  })
  remove(@Param('id') id: string) {
    try {
      return this.newsBannerService.remove(+id);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '删除要闻动态banner失败'
      });
    }
  }
}
