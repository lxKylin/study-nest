import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import { CreateArticleDto } from '@/dto/article/create-article.dto';
import { UpdateArticleDto } from '@/dto/article/update-article.dto';
import { Article } from '@/entities/article.entity';
import { Classify } from '@/entities/classify.entity';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';
import { BUSINESS_ERROR_CODE } from '@/common/exceptions/business.error.codes';
import { BusinessException } from '@/common/exceptions/business.exception';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(Classify)
    private readonly classifyRepository: Repository<Classify>
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    // const article = await this.articleRepository.create({
    //   ...createArticleDto
    // });
    // const { title } = article;
    // if (!title) {
    //   throw new HttpException('缺少文章标题', 401);
    // }
    // return await this.articleRepository.save(article);
    try {
      const classify = await Promise.all(
        createArticleDto.classify.map((name) => this.preloadRoleByName(name))
      );

      const article = this.articleRepository.create({
        ...createArticleDto,
        classify
      });

      const { title } = article;
      if (!title) {
        throw new HttpException('文章标题不可为空', 401);
      }

      return this.articleRepository.save(article);
    } catch (error) {
      console.log(error);
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '用户添加失败'
      });
    }
  }

  async getArticleList(paginationsQuery: PaginationQueryDto) {
    const { limit, offset } = paginationsQuery;
    return await this.articleRepository.find({
      // 新的方式
      relations: {
        classify: true
      },
      skip: offset,
      take: limit
    });
  }

  async findOneById(id: number) {
    return await this.articleRepository.findOne({
      where: { id },
      relations: { classify: true }
    });
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    // const article = await this.articleRepository.preload({
    //   id,
    //   ...updateArticleDto
    // });
    // if (!article) {
    //   throw new NotFoundException(`${id} not found`);
    // }
    // return await this.articleRepository.save(article);
    try {
      const classify =
        updateArticleDto.classify &&
        (await Promise.all(
          updateArticleDto.classify.map((name) => this.preloadRoleByName(name))
        ));

      const article = await this.articleRepository.preload({
        id: id,
        ...updateArticleDto,
        classify
      });
      if (!article) {
        throw new NotFoundException(`${id} not found`);
      }
      return this.articleRepository.save(article);
    } catch (error) {
      console.log(error);
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '用户修改失败'
      });
    }
  }

  async remove(id: number) {
    const article = await this.articleRepository.findOneBy({ id });
    if (!article) {
      throw new NotFoundException(`${id} not found`);
    }
    return await this.articleRepository.remove(article);
  }

  // 私有方法，将角色名作为入参并返回
  private async preloadRoleByName(name: string): Promise<Classify> {
    const existingRole = await this.classifyRepository.findOne({
      where: { name }
    });
    if (existingRole) {
      return existingRole;
    }
    return this.classifyRepository.create({ name });
  }
}
