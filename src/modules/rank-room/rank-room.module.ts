import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RankRoom, Room } from 'src/model';
import { RankRoomController } from './rank-room.controller';
import { RankRoomService } from './rank-room.service';

import { DetailStatusModule } from '../detail-status/detail-status.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RankRoom, Room]),
    DetailStatusModule,
  ],
  controllers: [RankRoomController],
  providers: [RankRoomService],
  exports: [RankRoomService],
})
export class RankRoomModule {}
