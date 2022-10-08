import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UnitDownloadService } from './unit-download.service';
import { UnitDownloadController } from './unit-download.controller';
import { UnitDownload } from './entities/unit-download.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UnitDownload])],
  controllers: [UnitDownloadController],
  providers: [UnitDownloadService]
})
export class UnitDownloadModule {}
