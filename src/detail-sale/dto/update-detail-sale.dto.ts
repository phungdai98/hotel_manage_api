import { PartialType } from '@nestjs/swagger';
import { CreateDetailSaleDto } from './create-detail-sale.dto';

export class UpdateDetailSaleDto extends PartialType(CreateDetailSaleDto) {}
