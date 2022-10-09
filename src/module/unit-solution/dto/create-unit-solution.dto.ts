import { ApiProperty } from '@nestjs/swagger';

// 自己设置类型
export class CreateUnitSolutionDto {
  //ApiProperty是对数据类型的描述
  @ApiProperty({ description: '单位标识' })
  unit_id: string;
  @ApiProperty({ description: '图片' })
  image: string;
  @ApiProperty({ description: '标题' })
  title: string;
  @ApiProperty({ description: '简介' })
  about: string;
  @ApiProperty({ description: '官网链接' })
  link: string;
}
