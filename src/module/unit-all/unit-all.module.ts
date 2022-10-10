import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UnitAllService } from './unit-all.service';
import { UnitAllController } from './unit-all.controller';
import { UnitAll } from './entities/unit-all.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UnitAll])],
  controllers: [UnitAllController],
  providers: [UnitAllService]
})
export class UnitAllModule {}
