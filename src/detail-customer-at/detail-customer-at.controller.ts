import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetailCustomerAtService } from './detail-customer-at.service';
import { CreateDetailCustomerAtDto } from './dto/create-detail-customer-at.dto';
import { UpdateDetailCustomerAtDto } from './dto/update-detail-customer-at.dto';

@Controller('detail-customer-at')
export class DetailCustomerAtController {
  constructor(private readonly detailCustomerAtService: DetailCustomerAtService) {}

  @Post()
  create(@Body() createDetailCustomerAtDto: CreateDetailCustomerAtDto) {
    return this.detailCustomerAtService.create(createDetailCustomerAtDto);
  }

  @Get()
  findAll() {
    return this.detailCustomerAtService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detailCustomerAtService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetailCustomerAtDto: UpdateDetailCustomerAtDto) {
    return this.detailCustomerAtService.update(+id, updateDetailCustomerAtDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detailCustomerAtService.remove(+id);
  }
}
