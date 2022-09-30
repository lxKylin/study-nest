import { ApiProperty } from '@nestjs/swagger';

// 自己设置类型
export class CreatePersonDto {
  //ApiProperty是对数据类型的描述
  @ApiProperty({ description: '年份' })
  year: string;
  @ApiProperty({ description: '个人图片' })
  image: string;
  @ApiProperty({ description: '个人名字' })
  name: string;
  @ApiProperty({ description: '个人荣誉' })
  honor: string;
}
