import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NewsBannerService } from './news-banner.service';
import { NewsBannerController } from './news-banner.controller';
import { NewsBanner } from './entities/news-banner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NewsBanner])],
  controllers: [NewsBannerController],
  providers: [NewsBannerService]
})
export class NewsBannerModule {}
