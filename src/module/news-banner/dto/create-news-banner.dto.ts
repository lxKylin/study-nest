import { ApiProperty } from '@nestjs/swagger';

// 自己设置类型
export class CreateNewsBannerDto {
  @ApiProperty({ description: 'banner图片' })
  image: string;
  @ApiProperty({ description: '图片描述' })
  alt: string;
}
