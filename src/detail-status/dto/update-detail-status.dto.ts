import { PartialType } from '@nestjs/swagger';
import { CreateDetailStatusDto } from './create-detail-status.dto';

export class UpdateDetailStatusDto extends PartialType(CreateDetailStatusDto) {}
