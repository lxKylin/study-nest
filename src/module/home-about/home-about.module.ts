import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HomeAboutService } from './home-about.service';
import { HomeAboutController } from './home-about.controller';
import { HomeAbout } from './entities/home-about.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HomeAbout])],
  controllers: [HomeAboutController],
  providers: [HomeAboutService]
})
export class HomeAboutModule {}
