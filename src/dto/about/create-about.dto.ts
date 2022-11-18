import { ApiProperty } from '@nestjs/swagger';

// 自己设置类型
export class CreateAboutDto {
  //ApiProperty是对数据类型的描述
  @ApiProperty({ description: '分类' })
  classify: string;
  @ApiProperty({ description: '名称' })
  name: string;
  @ApiProperty({ description: '文字' })
  text: string;
}
