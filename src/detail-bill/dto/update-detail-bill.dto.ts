import { PartialType } from '@nestjs/swagger';
import { CreateDetailBillDto } from './create-detail-bill.dto';

export class UpdateDetailBillDto extends PartialType(CreateDetailBillDto) {}
