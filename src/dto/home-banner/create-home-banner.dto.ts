import { ApiProperty } from '@nestjs/swagger';

// 自己设置类型
export class CreateHomeBannerDto {
  @ApiProperty({ description: '轮播图' })
  image: string;
  @ApiProperty({ description: '图片描述' })
  alt: string;
}
