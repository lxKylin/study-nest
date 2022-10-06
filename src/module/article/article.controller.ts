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
import { BUSINESS_ERROR_CODE } from '@/common/exceptions/business.error.codes';
import { BusinessException } from '@/common/exceptions/business.exception';

@ApiTags('文章模块')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @ApiOperation({
    summary: '添加文章'
  })
  create(@Body() createArticleDto: CreateArticleDto) {
    try {
      return this.articleService.create(createArticleDto);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '文章添加失败'
      });
    }
  }

  @Get('list')
  @ApiOperation({
    summary: '获取文章列表'
  })
  findAll(@Query() paginationsQuery: PaginationQueryDto) {
    try {
      return this.articleService.getArticleList(paginationsQuery);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '获取文章列表失败'
      });
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: '根据id获得文章'
  })
  findOne(@Param('id') id: string) {
    try {
      return this.articleService.findOneById(+id);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '获取文章失败'
      });
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: '根据id更新文章'
  })
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    try {
      return this.articleService.update(+id, updateArticleDto);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '修改文章失败'
      });
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: '根据id删除文章'
  })
  remove(@Param('id') id: string) {
    try {
      return this.articleService.remove(+id);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '删除文章失败'
      });
    }
  }
}
