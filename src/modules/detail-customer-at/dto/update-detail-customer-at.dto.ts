import { PartialType } from '@nestjs/swagger';
import { CreateDetailCustomerAtDto } from './create-detail-customer-at.dto';

export class UpdateDetailCustomerAtDto extends PartialType(CreateDetailCustomerAtDto) {}
