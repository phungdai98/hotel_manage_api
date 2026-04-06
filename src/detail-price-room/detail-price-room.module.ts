import { Module } from '@nestjs/common';
import { DetailPriceRoomService } from './detail-price-room.service';
import { DetailPriceRoomController } from './detail-price-room.controller';

@Module({
  controllers: [DetailPriceRoomController],
  providers: [DetailPriceRoomService],
})
export class DetailPriceRoomModule {}
