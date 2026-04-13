import { Module } from '@nestjs/common';
import { DetailStatusService } from './detail-status.service';
import { DetailStatusController } from './detail-status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailStatus } from 'src/model';

@Module({
  imports: [TypeOrmModule.forFeature([DetailStatus])],
  controllers: [DetailStatusController],
  providers: [DetailStatusService],
})
export class DetailStatusModule {}
