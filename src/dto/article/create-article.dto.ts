import { ApiProperty } from '@nestjs/swagger';

import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  ArrayNotEmpty
} from 'class-validator';

// 自己设置类型
export class CreateArticleDto {
  //ApiProperty是对数据类型的描述
  @ApiProperty({ description: '标题' })
  @IsNotEmpty({ message: '文章标题是必填的' })
  @IsString()
  title: string;

  @ApiProperty({ description: '作者' })
  @IsNotEmpty()
  @IsString()
  author: string;

  @ApiProperty({ description: '分类', default: ['Kylin'] })
  @IsNotEmpty()
  @ArrayNotEmpty()
  classify: string[];

  @ApiProperty({ description: '封面图片' })
  @IsString()
  image: string;

  @ApiProperty({ description: '是否推荐' })
  @IsNotEmpty()
  @IsBoolean()
  isRecommend: boolean;

  @ApiProperty({ description: '文章简介' })
  @IsNotEmpty()
  @IsString()
  about: string;

  @ApiProperty({ description: '文章详情' })
  @IsNotEmpty()
  @IsString()
  article: string;
}
