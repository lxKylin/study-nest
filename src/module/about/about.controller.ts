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

@ApiTags('关于模块')
@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Post()
  @ApiOperation({
    summary: '添加about' // 接口描述信息
  })
  create(@Body() createAboutDto: CreateAboutDto) {
    return this.aboutService.create(createAboutDto);
  }

  @Get('list')
  @ApiOperation({
    summary: '获取about列表' // 接口描述信息
  })
  findAll(@Query() paginationsQuery: PaginationQueryDto) {
    return this.aboutService.getAboutList(paginationsQuery);
  }

  @Get(':id')
  @ApiOperation({
    summary: '根据id获取about' // 接口描述信息
  })
  findOne(@Param('id') id: string) {
    return this.aboutService.findOneById(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '根据id修改about' // 接口描述信息
  })
  update(@Param('id') id: string, @Body() updateAboutDto: UpdateAboutDto) {
    return this.aboutService.update(+id, updateAboutDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '根据id删除about' // 接口描述信息
  })
  remove(@Param('id') id: string) {
    return this.aboutService.remove(+id);
  }
}
