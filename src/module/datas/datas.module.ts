import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatasService } from './datas.service';
import { DatasController } from './datas.controller';
import { Data } from './entities/data.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Data])],
  controllers: [DatasController],
  providers: [DatasService]
})
export class DatasModule {}
