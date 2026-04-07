import { Module } from '@nestjs/common';
import { RankRoomService } from './rank-room.service';
import { RankRoomController } from './rank-room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RankRoom } from 'src/model';

@Module({
  imports: [TypeOrmModule.forFeature([RankRoom])],
  controllers: [RankRoomController],
  providers: [RankRoomService],
})
export class RankRoomModule {}
