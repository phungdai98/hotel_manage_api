import { Module } from '@nestjs/common';
import { TypeRoomService } from './type-room.service';
import { TypeRoomController } from './type-room.controller';
import { TypeRoom } from 'src/model';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TypeRoom])],
  controllers: [TypeRoomController],
  providers: [TypeRoomService],
})
export class TypeRoomModule {}
