import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UnitSolutionService } from './unit-solution.service';
import { UnitSolutionController } from './unit-solution.controller';
import { UnitSolution } from './entities/unit-solution.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UnitSolution])],
  controllers: [UnitSolutionController],
  providers: [UnitSolutionService]
})
export class UnitSolutionModule {}
