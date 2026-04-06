import { Module } from '@nestjs/common';
import { DetailStatusService } from './detail-status.service';
import { DetailStatusController } from './detail-status.controller';

@Module({
  controllers: [DetailStatusController],
  providers: [DetailStatusService],
})
export class DetailStatusModule {}
