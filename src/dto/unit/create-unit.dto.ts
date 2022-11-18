import { ApiProperty } from '@nestjs/swagger';

// 自己设置类型
export class CreateUnitDto {
  //ApiProperty是对数据类型的描述
  @ApiProperty({ description: '年份' })
  year: string;
  @ApiProperty({ description: '公司名称' })
  company: string;
  @ApiProperty({ description: '荣誉名称' })
  honor: string;
}
