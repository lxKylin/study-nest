import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HomeBannerService } from './home-banner.service';
import { HomeBannerController } from './home-banner.controller';
import { HomeBanner } from './entities/home-banner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HomeBanner])],
  controllers: [HomeBannerController],
  providers: [HomeBannerService]
})
export class HomeBannerModule {}
