import { Module } from '@nestjs/common';
import { DetailServiceService } from './detail-service.service';
import { DetailServiceController } from './detail-service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailService } from 'src/model';
import { ServiceHotelModule } from '../service-hotel/service-hotel.module';
import { DetailStatusModule } from '../detail-status/detail-status.module';

@Module({
  imports: [TypeOrmModule.forFeature([DetailService]), ServiceHotelModule, DetailStatusModule],
  controllers: [DetailServiceController],
  providers: [DetailServiceService],
})
export class DetailServiceModule {}
