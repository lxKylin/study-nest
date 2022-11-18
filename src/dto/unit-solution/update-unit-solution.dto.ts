import { PartialType } from '@nestjs/swagger';
import { CreateUnitSolutionDto } from './create-unit-solution.dto';

export class UpdateUnitSolutionDto extends PartialType(CreateUnitSolutionDto) {}
