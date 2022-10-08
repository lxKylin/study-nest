import { ApiProperty } from '@nestjs/swagger';

// 自己设置类型
export class CreateUnitProductDto {
  //ApiProperty是对数据类型的描述
  @ApiProperty({ description: '单位标识' })
  unit_id: string;
  @ApiProperty({ description: 'logo' })
  logo: string;
  @ApiProperty({ description: '图片' })
  image: string;
  @ApiProperty({ description: '简称' })
  abbreviation: string;
  @ApiProperty({ description: '产品名称' })
  name: boolean;
  @ApiProperty({ description: '简介' })
  about: string;
  @ApiProperty({ description: '官网链接' })
  link: string;
}
