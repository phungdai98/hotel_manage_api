import { Module } from '@nestjs/common';
import { ServiceHotelService } from './service-hotel.service';
import { ServiceHotelController } from './service-hotel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from 'src/model';

@Module({
  imports: [TypeOrmModule.forFeature([Service])],
  controllers: [ServiceHotelController],
  providers: [ServiceHotelService],
  exports: [ServiceHotelService],
})
export class ServiceHotelModule {}
