import { Module } from '@nestjs/common';
import { StatusRoomService } from './status-room.service';
import { StatusRoomController } from './status-room.controller';

@Module({
  controllers: [StatusRoomController],
  providers: [StatusRoomService],
})
export class StatusRoomModule {}
