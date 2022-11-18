import { ApiProperty } from '@nestjs/swagger';

// 自己设置类型
export class CreateUnitAllDto {
  //ApiProperty是对数据类型的描述
  @ApiProperty({ description: '单位标识' })
  unit_id: string;
  @ApiProperty({ description: '单位分类' })
  classify: string;
  @ApiProperty({ description: 'logo' })
  logo: string;
  @ApiProperty({ description: '详情页logo' })
  detail_logo: string;
  @ApiProperty({ description: '单位名称' })
  company: string;
  @ApiProperty({ description: '单位简称' })
  for_short: string;
  @ApiProperty({ description: '单位荣誉' })
  honor: string;
  @ApiProperty({ description: '官网链接' })
  web: string;
  @ApiProperty({ description: '口号' })
  slogan: string;
  @ApiProperty({ description: '口号图片' })
  slogan_img: string;
  @ApiProperty({ description: '简介' })
  about: string;
  @ApiProperty({ description: '首页简介' })
  home_about: string;
  @ApiProperty({ description: '官网资料链接' })
  data_link: string;
  @ApiProperty({ description: '官网链接' })
  image: string;
  @ApiProperty({ description: '是否推荐' })
  isRecommend: boolean;
  @ApiProperty({ description: '首页图片' })
  home_img: string;
  @ApiProperty({ description: '详情页banner' })
  banner_img: string;
}
