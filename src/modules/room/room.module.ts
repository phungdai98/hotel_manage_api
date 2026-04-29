import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailStatus, RankRoom, Room } from 'src/model';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Room, RankRoom, DetailStatus]),
  ],
  controllers: [RoomController],
  providers: [RoomService],
  exports: [RoomService],
})
export class RoomModule {}

