import { ApiProperty } from '@nestjs/swagger';

// 自己设置类型
export class CreateDataDto {
  //ApiProperty是对数据类型的描述
  @ApiProperty({ description: '资料标题' })
  title: string;
  @ApiProperty({ description: '资料作者' })
  author: string;
  @ApiProperty({ description: '资料分类' })
  classify: string;
  @ApiProperty({ description: '封面图片' })
  image: string;
  @ApiProperty({ description: '是否推荐' })
  isRecommend: boolean;
  @ApiProperty({ description: '资料简介' })
  about: string;
  @ApiProperty({ description: '资料详情' })
  article: string;
  @ApiProperty({ description: '资料链接' })
  link: string;
}
