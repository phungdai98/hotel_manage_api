import { Module } from '@nestjs/common';
import { RankRoomService } from './rank-room.service';
import { RankRoomController } from './rank-room.controller';

@Module({
  controllers: [RankRoomController],
  providers: [RankRoomService],
})
export class RankRoomModule {}
