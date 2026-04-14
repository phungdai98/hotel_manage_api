import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ServiceHotelService } from './service-hotel.service';
import { CreateServiceHotelDto } from './dto/create-service-hotel.dto';
import { UpdateServiceHotelDto } from './dto/update-service-hotel.dto';
import { BaseController } from 'src/common/base.controller';

@Controller('service-hotel')
export class ServiceHotelController extends BaseController {
  constructor(private readonly serviceHotelService: ServiceHotelService) {
    super();
  }

  @Post()
  create(@Body() createServiceHotelDto: CreateServiceHotelDto) {
    return this.serviceHotelService.create(createServiceHotelDto);
  }

  @Get()
  findAll() {
    return this.serviceHotelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.serviceHotelService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateServiceHotelDto: UpdateServiceHotelDto) {
    return this.serviceHotelService.update(id, updateServiceHotelDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.serviceHotelService.remove(id);
  }
}
