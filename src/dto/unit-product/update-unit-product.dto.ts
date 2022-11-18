import { PartialType } from '@nestjs/swagger';
import { CreateUnitProductDto } from './create-unit-product.dto';

export class UpdateUnitProductDto extends PartialType(CreateUnitProductDto) {}
