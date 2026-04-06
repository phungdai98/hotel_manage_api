import { Injectable } from '@nestjs/common';
import { CreateServiceHotelDto } from './dto/create-service-hotel.dto';
import { UpdateServiceHotelDto } from './dto/update-service-hotel.dto';

@Injectable()
export class ServiceHotelService {
  create(createServiceHotelDto: CreateServiceHotelDto) {
    return 'This action adds a new serviceHotel';
  }

  findAll() {
    return `This action returns all serviceHotel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} serviceHotel`;
  }

  update(id: number, updateServiceHotelDto: UpdateServiceHotelDto) {
    return `This action updates a #${id} serviceHotel`;
  }

  remove(id: number) {
    return `This action removes a #${id} serviceHotel`;
  }
}
