import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { DetailCustomerAtService } from './detail-customer-at.service';
import { CreateDetailCustomerAtDto } from './dto/create-detail-customer-at.dto';
import { UpdateDetailCustomerAtDto } from './dto/update-detail-customer-at.dto';
import { BaseController } from 'src/common/base.controller';

@Controller('detail-customer-at')
export class DetailCustomerAtController extends BaseController {
  constructor(private readonly detailCustomerAtService: DetailCustomerAtService) {
    super();
  }

  @Post()
  create(@Body() createDetailCustomerAtDto: CreateDetailCustomerAtDto) {
    return this.detailCustomerAtService.create(createDetailCustomerAtDto);
  }

  @Get()
  findAll() {
    return this.detailCustomerAtService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.detailCustomerAtService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateDetailCustomerAtDto: UpdateDetailCustomerAtDto) {
    return this.detailCustomerAtService.update(id, updateDetailCustomerAtDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.detailCustomerAtService.remove(id);
  }
}
