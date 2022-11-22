import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import { CreateArticleDto } from '@/dto/article/create-article.dto';
import { UpdateArticleDto } from '@/dto/article/update-article.dto';
import { Article } from '@/entities/article.entity';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    const article = await this.articleRepository.create({
      ...createArticleDto
    });
    const { title } = article;
    if (!title) {
      throw new HttpException('缺少文章标题', 401);
    }
    return await this.articleRepository.save(article);
  }

  async getArticleList(paginationsQuery: PaginationQueryDto) {
    const { limit, offset } = paginationsQuery;
    return await this.articleRepository.find({
      skip: offset,
      take: limit
    });
  }

  async findOneById(id: number) {
    return await this.articleRepository.findOneBy({ id });
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    const article = await this.articleRepository.preload({
      id,
      ...updateArticleDto
    });
    if (!article) {
      throw new NotFoundException(`${id} not found`);
    }
    return await this.articleRepository.save(article);
  }

  async remove(id: number) {
    const article = await this.articleRepository.findOneBy({ id });
    if (!article) {
      throw new NotFoundException(`${id} not found`);
    }
    return await this.articleRepository.remove(article);
  }
}
