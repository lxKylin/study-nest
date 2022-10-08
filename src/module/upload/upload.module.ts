import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { Picture } from './entities/picture';
import { File } from './entities/file';

@Module({
  imports: [TypeOrmModule.forFeature([Picture, File])],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule {}
