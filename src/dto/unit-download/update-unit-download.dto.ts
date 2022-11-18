import { PartialType } from '@nestjs/swagger';
import { CreateUnitDownloadDto } from './create-unit-download.dto';

export class UpdateUnitDownloadDto extends PartialType(CreateUnitDownloadDto) {}
