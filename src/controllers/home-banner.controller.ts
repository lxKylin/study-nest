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

import { HomeBannerService } from '@/services/home-banner.service';
import { CreateHomeBannerDto } from '@/dto/home-banner/create-home-banner.dto';
import { UpdateHomeBannerDto } from '@/dto/home-banner/update-home-banner.dto';

import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';
import { BUSINESS_ERROR_CODE } from '@/common/exceptions/business.error.codes';
import { BusinessException } from '@/common/exceptions/business.exception';

@ApiTags('首页轮播图模块')
@Controller('home-banner')
export class HomeBannerController {
  constructor(private readonly homeBannerService: HomeBannerService) {}

  @Post()
  @ApiOperation({
    summary: '添加轮播图'
  })
  create(@Body() createHomeBannerDto: CreateHomeBannerDto) {
    try {
      return this.homeBannerService.create(createHomeBannerDto);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '轮播图添加失败'
      });
    }
  }

  @Get('list')
  @ApiOperation({
    summary: '获取轮播图列表' // 接口描述信息
  })
  findAll(@Query() paginationsQuery: PaginationQueryDto) {
    try {
      return this.homeBannerService.getHomeBannerList(paginationsQuery);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '获取轮播图列表失败'
      });
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: '根据id获取轮播图' // 接口描述信息
  })
  findOne(@Param('id') id: string) {
    try {
      return this.homeBannerService.findOneById(+id);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '获取轮播图失败'
      });
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: '根据id修改轮播图' // 接口描述信息
  })
  update(
    @Param('id') id: string,
    @Body() updateHomeBannerDto: UpdateHomeBannerDto
  ) {
    try {
      return this.homeBannerService.update(+id, updateHomeBannerDto);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '修改轮播图失败'
      });
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: '根据id删除轮播图' // 接口描述信息
  })
  remove(@Param('id') id: string) {
    try {
      return this.homeBannerService.remove(+id);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '删除轮播图失败'
      });
    }
  }
}
