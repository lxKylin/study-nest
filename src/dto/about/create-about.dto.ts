import { ApiProperty } from '@nestjs/swagger';
// 校验规则
/**
 * @IsString() 是否为字符串
 * @IsNotEmpty() 检查给定值是否不为空
 */
import { IsString, IsNotEmpty } from 'class-validator';
// 自己设置类型
export class CreateAboutDto {
  //ApiProperty是对数据类型的描述
  @ApiProperty({ description: '分类' })
  @IsNotEmpty()
  @IsString()
  classify: string;

  @ApiProperty({ description: '名称' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: '文字' })
  @IsNotEmpty()
  @IsString()
  text: string;
}
