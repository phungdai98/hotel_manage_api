import { Module } from '@nestjs/common';
import { KindRoomService } from './kind-room.service';
import { KindRoomController } from './kind-room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KindRoom } from 'src/model';

@Module({
  imports: [TypeOrmModule.forFeature([KindRoom])],
  controllers: [KindRoomController],
  providers: [KindRoomService],
})
export class KindRoomModule {}
