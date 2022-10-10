import { ApiProperty } from '@nestjs/swagger';

// 自己设置类型
export class CreateUnitMomentDto {
  //ApiProperty是对数据类型的描述
  @ApiProperty({ description: '单位标识' })
  unit_id: string;
  @ApiProperty({ description: '左侧顶部文字' })
  left_top: string;
  @ApiProperty({ description: '左侧顶部图片' })
  left_top_img: string;
  @ApiProperty({ description: '左侧底部文字' })
  bottom_left: string;
  @ApiProperty({ description: '左侧底部图片' })
  bottom_left_img: string;
  @ApiProperty({ description: '底部右侧文字' })
  bottom_right: string;
  @ApiProperty({ description: '底部右侧图片' })
  bottom_right_img: string;
  @ApiProperty({ description: '右侧文字' })
  right_title: string;
  @ApiProperty({ description: '右侧图片' })
  right_img: string;
}
