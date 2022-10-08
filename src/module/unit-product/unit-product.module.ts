import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UnitProductService } from './unit-product.service';
import { UnitProductController } from './unit-product.controller';
import { UnitProduct } from './entities/unit-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UnitProduct])],
  controllers: [UnitProductController],
  providers: [UnitProductService]
})
export class UnitProductModule {}
