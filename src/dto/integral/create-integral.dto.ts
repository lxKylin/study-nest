import { ApiProperty } from '@nestjs/swagger';

// 自己设置类型
export class CreateIntegralDto {
  @ApiProperty({ description: '公司名称' })
  company: string;
  @ApiProperty({ description: '积分' })
  integral: number;
}
