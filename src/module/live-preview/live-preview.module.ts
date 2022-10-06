import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LivePreviewService } from './live-preview.service';
import { LivePreviewController } from './live-preview.controller';
import { LivePreview } from './entities/live-preview.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LivePreview])],
  controllers: [LivePreviewController],
  providers: [LivePreviewService]
})
export class LivePreviewModule {}
