import { ApiProperty } from '@nestjs/swagger';

import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

// 自己设置类型
export class CreateDataDto {
  //ApiProperty是对数据类型的描述
  @ApiProperty({ description: '资料标题' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: '资料作者' })
  @IsNotEmpty()
  @IsString()
  author: string;

  @ApiProperty({ description: '资料分类' })
  @IsNotEmpty()
  @IsString()
  classify: string;

  @ApiProperty({ description: '封面图片' })
  @IsNotEmpty()
  @IsString()
  image: string;

  @ApiProperty({ description: '是否推荐' })
  @IsNotEmpty()
  @IsBoolean()
  isRecommend: boolean;

  @ApiProperty({ description: '资料简介' })
  @IsNotEmpty()
  @IsString()
  about: string;

  @ApiProperty({ description: '资料详情' })
  @IsNotEmpty()
  @IsString()
  article: string;

  @ApiProperty({ description: '资料链接' })
  @IsNotEmpty()
  @IsString()
  link: string;
}
