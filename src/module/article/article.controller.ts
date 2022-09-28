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

import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';

@ApiTags('文章模块')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @ApiOperation({
    summary: '添加文章'
  })
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  @Get('list')
  @ApiOperation({
    summary: '获取文章列表'
  })
  findAll(@Query() paginationsQuery: PaginationQueryDto) {
    return this.articleService.getArticleList(paginationsQuery);
  }

  @Get(':id')
  @ApiOperation({
    summary: '根据id获得文章'
  })
  findOne(@Param('id') id: string) {
    return this.articleService.findOneById(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '根据id更新文章'
  })
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '根据id删除文章'
  })
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }
}
