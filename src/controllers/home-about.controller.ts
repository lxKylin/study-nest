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

import { HomeAboutService } from '@/services/home-about.service';
import { CreateHomeAboutDto } from '@/dto/home-about/create-home-about.dto';
import { UpdateHomeAboutDto } from '@/dto/home-about/update-home-about.dto';

import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';
import { BUSINESS_ERROR_CODE } from '@/common/exceptions/business.error.codes';
import { BusinessException } from '@/common/exceptions/business.exception';

@ApiTags('关于我们模块')
@Controller('home-about')
export class HomeAboutController {
  constructor(private readonly homeAboutService: HomeAboutService) {}

  @ApiOperation({
    summary: '添加关于我们资料'
  })
  @Post()
  create(@Body() createHomeAboutDto: CreateHomeAboutDto) {
    try {
      return this.homeAboutService.create(createHomeAboutDto);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '关于我们资料添加失败'
      });
    }
  }

  @Get('list')
  @ApiOperation({
    summary: '获取关于我们资料列表' // 接口描述信息
  })
  findAll(@Query() paginationsQuery: PaginationQueryDto) {
    try {
      return this.homeAboutService.getHomeAboutList(paginationsQuery);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '获取关于我们资料列表失败'
      });
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: '根据id获取关于我们资料' // 接口描述信息
  })
  findOne(@Param('id') id: string) {
    try {
      return this.homeAboutService.findOneById(+id);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '获取关于我们资料失败'
      });
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: '根据id修改关于我们资料' // 接口描述信息
  })
  update(
    @Param('id') id: string,
    @Body() updateHomeAboutDto: UpdateHomeAboutDto
  ) {
    try {
      return this.homeAboutService.update(+id, updateHomeAboutDto);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '修改关于我们资料失败'
      });
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: '根据id删除关于我们资料' // 接口描述信息
  })
  remove(@Param('id') id: string) {
    try {
      return this.homeAboutService.remove(+id);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '删除关于我们资料失败'
      });
    }
  }
}
