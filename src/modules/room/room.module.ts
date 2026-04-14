import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailStatus, RankRoom, Room } from 'src/model';
import { RankRoomModule } from '../rank-room/rank-room.module';
import { DetailStatusModule } from '../detail-status/detail-status.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Room, RankRoom, DetailStatus]),
  ],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}

