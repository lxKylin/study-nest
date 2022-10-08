import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StandardsService } from './standards.service';
import { StandardsController } from './standards.controller';
import { Standard } from './entities/standard.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Standard])],
  controllers: [StandardsController],
  providers: [StandardsService]
})
export class StandardsModule {}
