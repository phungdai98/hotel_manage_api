import { Module } from '@nestjs/common';
import { DetailServiceService } from './detail-service.service';
import { DetailServiceController } from './detail-service.controller';

@Module({
  controllers: [DetailServiceController],
  providers: [DetailServiceService],
})
export class DetailServiceModule {}
