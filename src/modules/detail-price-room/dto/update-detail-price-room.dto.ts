import { PartialType } from '@nestjs/swagger';
import { CreateDetailPriceRoomDto } from './create-detail-price-room.dto';

export class UpdateDetailPriceRoomDto extends PartialType(CreateDetailPriceRoomDto) {}
