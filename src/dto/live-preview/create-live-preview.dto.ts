import { ApiProperty } from '@nestjs/swagger';

// 自己设置类型
export class CreateLivePreviewDto {
  //ApiProperty是对数据类型的描述
  @ApiProperty({ description: '日期' })
  dates: string;
  @ApiProperty({ description: '时间' })
  time: string;
  @ApiProperty({ description: '直播标题' })
  title: string;
  @ApiProperty({ description: '直播简介' })
  about: string;
  @ApiProperty({ description: '是否预告' })
  isPredict: boolean;
  @ApiProperty({ description: '图片' })
  image: string;
  @ApiProperty({ description: '预告图片' })
  image_preview: string;
  @ApiProperty({ description: '直播链接' })
  link: string;
}
