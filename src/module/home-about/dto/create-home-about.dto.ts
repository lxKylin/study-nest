import { ApiProperty } from '@nestjs/swagger';

// 自己设置类型
export class CreateHomeAboutDto {
  //ApiProperty是对数据类型的描述
  @ApiProperty({ description: '关于我们文案' })
  about: string;
  @ApiProperty({ description: '微信公众号二维码' })
  image: string;
  @ApiProperty({ description: '个人名字' })
  address: string;
  @ApiProperty({ description: '联系电话' })
  phone: string;
  @ApiProperty({ description: '电子邮箱' })
  email: string;
  @ApiProperty({ description: '后台登录地址' })
  login: string;
}
