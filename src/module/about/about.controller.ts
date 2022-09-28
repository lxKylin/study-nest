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

import { AboutService } from './about.service';
import { CreateAboutDto } from './dto/create-about.dto';
import { UpdateAboutDto } from './dto/update-about.dto';

import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';
import { BUSINESS_ERROR_CODE } from '@/common/exceptions/business.error.codes';
import { BusinessException } from '@/common/exceptions/business.exception';

@ApiTags('关于模块')
@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Post()
  @ApiOperation({
    summary: '添加about' // 接口描述信息
  })
  create(@Body() createAboutDto: CreateAboutDto) {
    try {
      return this.aboutService.create(createAboutDto);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: 'about添加失败'
      });
    }
  }

  @Get('list')
  @ApiOperation({
    summary: '获取about列表' // 接口描述信息
  })
  findAll(@Query() paginationsQuery: PaginationQueryDto) {
    try {
      return this.aboutService.getAboutList(paginationsQuery);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '获取about列表失败'
      });
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: '根据id获取about' // 接口描述信息
  })
  findOne(@Param('id') id: string) {
    try {
      return this.aboutService.findOneById(+id);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '获取about失败'
      });
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: '根据id修改about' // 接口描述信息
  })
  update(@Param('id') id: string, @Body() updateAboutDto: UpdateAboutDto) {
    try {
      return this.aboutService.update(+id, updateAboutDto);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '修改about失败'
      });
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: '根据id删除about' // 接口描述信息
  })
  remove(@Param('id') id: string) {
    try {
      return this.aboutService.remove(+id);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '删除about失败'
      });
    }
  }
}
