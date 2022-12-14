import { ApiProperty } from '@nestjs/swagger';

import { IsString, IsNotEmpty } from 'class-validator';

// 自己设置类型
export class CreateUserDto {
  //ApiProperty是对数据类型的描述
  @ApiProperty({ description: '用户名', default: 'Kylin' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ description: '密码', default: 'siJue' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ description: '角色', default: ['admin'] })
  @IsNotEmpty()
  @IsString({ each: true })
  roles: string[];
}
