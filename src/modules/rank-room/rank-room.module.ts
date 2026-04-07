import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RankRoom } from 'src/model';
import { RankRoomController } from './rank-room.controller';
import { RankRoomService } from './rank-room.service';

@Module({
  imports: [TypeOrmModule.forFeature([RankRoom])],
  controllers: [RankRoomController],
  providers: [RankRoomService],
})
export class RankRoomModule {}
