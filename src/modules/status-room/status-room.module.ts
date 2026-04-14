import { Module } from '@nestjs/common';
import { StatusRoomService } from './status-room.service';
import { StatusRoomController } from './status-room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusRoom } from 'src/model';

@Module({
  imports: [TypeOrmModule.forFeature([StatusRoom])],
  controllers: [StatusRoomController],
  providers: [StatusRoomService],
})
export class StatusRoomModule {}
