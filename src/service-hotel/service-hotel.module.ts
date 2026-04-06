import { Module } from '@nestjs/common';
import { ServiceHotelService } from './service-hotel.service';
import { ServiceHotelController } from './service-hotel.controller';

@Module({
  controllers: [ServiceHotelController],
  providers: [ServiceHotelService],
})
export class ServiceHotelModule {}
