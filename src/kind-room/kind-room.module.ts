import { Module } from '@nestjs/common';
import { KindRoomService } from './kind-room.service';
import { KindRoomController } from './kind-room.controller';

@Module({
  controllers: [KindRoomController],
  providers: [KindRoomService],
})
export class KindRoomModule {}
