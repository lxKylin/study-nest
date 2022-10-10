import { PartialType } from '@nestjs/swagger';
import { CreateUnitMomentDto } from './create-unit-moment.dto';

export class UpdateUnitMomentDto extends PartialType(CreateUnitMomentDto) {}
