import { PartialType } from '@nestjs/swagger';
import { CreateUnitAllDto } from './create-unit-all.dto';

export class UpdateUnitAllDto extends PartialType(CreateUnitAllDto) {}
