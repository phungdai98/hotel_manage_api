import { Module } from '@nestjs/common';
import { DetailPriceRoomService } from './detail-price-room.service';
import { DetailPriceRoomController } from './detail-price-room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailPriceRoom } from 'src/model';

@Module({
  imports: [TypeOrmModule.forFeature([DetailPriceRoom])],
  controllers: [DetailPriceRoomController],
  providers: [DetailPriceRoomService],
})
export class DetailPriceRoomModule {}
