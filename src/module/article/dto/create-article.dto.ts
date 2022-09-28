import { ApiProperty } from '@nestjs/swagger';

// 自己设置类型
export class CreateArticleDto {
  //ApiProperty是对数据类型的描述
  @ApiProperty({ description: '标题' })
  title: string;
  @ApiProperty({ description: '作者' })
  author: string;
  @ApiProperty({ description: '分类' })
  classify: string;
  @ApiProperty({ description: '封面图片' })
  image: string;
  @ApiProperty({ description: '是否推荐' })
  isRecommend: boolean;
  @ApiProperty({ description: '文章简介' })
  about: string;
  @ApiProperty({ description: '文章详情' })
  article: string;
  @ApiProperty({ description: '文章链接' })
  link: string;
}
