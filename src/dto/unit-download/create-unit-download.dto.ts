import { ApiProperty } from '@nestjs/swagger';

// 自己设置类型
export class CreateUnitDownloadDto {
  //ApiProperty是对数据类型的描述
  @ApiProperty({ description: '单位标识' })
  unit_id: string;
  @ApiProperty({ description: '标题' })
  title: string;
  @ApiProperty({ description: '作者' })
  author: string;
  @ApiProperty({ description: '图片' })
  image: string;
  @ApiProperty({ description: '是否推荐' })
  isRecommend: boolean;
  @ApiProperty({ description: '简介' })
  about: string;
  @ApiProperty({ description: '下载链接' })
  link: string;
}
