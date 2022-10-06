import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IntegralService } from './integral.service';
import { IntegralController } from './integral.controller';
import { Integral } from './entities/integral.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Integral])],
  controllers: [IntegralController],
  providers: [IntegralService]
})
export class IntegralModule {}
