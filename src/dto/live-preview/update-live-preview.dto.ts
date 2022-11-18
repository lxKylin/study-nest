import { PartialType } from '@nestjs/swagger';
import { CreateLivePreviewDto } from './create-live-preview.dto';

export class UpdateLivePreviewDto extends PartialType(CreateLivePreviewDto) {}
