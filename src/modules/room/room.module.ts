import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailStatus, RankRoom, Room } from 'src/model';

@Module({
  imports: [TypeOrmModule.forFeature([Room, RankRoom, DetailStatus])],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}

