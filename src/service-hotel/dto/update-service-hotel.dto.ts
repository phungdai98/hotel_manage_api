import { PartialType } from '@nestjs/swagger';
import { CreateServiceHotelDto } from './create-service-hotel.dto';

export class UpdateServiceHotelDto extends PartialType(CreateServiceHotelDto) {}
