import { Module } from '@nestjs/common';
import { DetailStatusService } from './detail-status.service';
import { DetailStatusController } from './detail-status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailStatus } from 'src/model';
import { RoomModule } from '../room/room.module';
import { RentModule } from '../rent/rent.module';

@Module({
  imports: [TypeOrmModule.forFeature([DetailStatus]), RoomModule, RentModule],
  controllers: [DetailStatusController],
  providers: [DetailStatusService],
  exports: [DetailStatusService],
})
export class DetailStatusModule {}
