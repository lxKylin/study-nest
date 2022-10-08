import { PartialType } from '@nestjs/swagger';
import { CreateNewsBannerDto } from './create-news-banner.dto';

export class UpdateNewsBannerDto extends PartialType(CreateNewsBannerDto) {}
