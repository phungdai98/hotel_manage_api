import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServiceHotelService } from './service-hotel.service';
import { CreateServiceHotelDto } from './dto/create-service-hotel.dto';
import { UpdateServiceHotelDto } from './dto/update-service-hotel.dto';

@Controller('service-hotel')
export class ServiceHotelController {
  constructor(private readonly serviceHotelService: ServiceHotelService) {}

  @Post()
  create(@Body() createServiceHotelDto: CreateServiceHotelDto) {
    return this.serviceHotelService.create(createServiceHotelDto);
  }

  @Get()
  findAll() {
    return this.serviceHotelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceHotelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceHotelDto: UpdateServiceHotelDto) {
    return this.serviceHotelService.update(+id, updateServiceHotelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceHotelService.remove(+id);
  }
}
