import { PartialType } from '@nestjs/swagger';
import { CreateDetailPriceServiceDto } from './create-detail-price-service.dto';

export class UpdateDetailPriceServiceDto extends PartialType(CreateDetailPriceServiceDto) {}
