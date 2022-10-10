import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UnitMomentService } from './unit-moment.service';
import { UnitMomentController } from './unit-moment.controller';
import { UnitMoment } from './entities/unit-moment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UnitMoment])],
  controllers: [UnitMomentController],
  providers: [UnitMomentService]
})
export class UnitMomentModule {}
