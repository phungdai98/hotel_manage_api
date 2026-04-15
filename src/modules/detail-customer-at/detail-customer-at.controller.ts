import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { DetailCustomerAtService } from './detail-customer-at.service';
import { CreateDetailCustomerAtDto } from './dto/create-detail-customer-at.dto';
import { UpdateDetailCustomerAtDto } from './dto/update-detail-customer-at.dto';
import { BaseController } from 'src/common/base.controller';
import { ApiResponse } from 'src/common/entities/typeResponse';
import { DetailCustomerAtResponse } from './entities/detail-customer-at.entity';

@Controller('detail-customer-at')
export class DetailCustomerAtController extends BaseController {
  constructor(private readonly detailCustomerAtService: DetailCustomerAtService) {
    super();
  }

  @Post()
  create(@Body() createDetailCustomerAtDto: CreateDetailCustomerAtDto): Promise<ApiResponse<null>> {
    return this.detailCustomerAtService.create(createDetailCustomerAtDto);
  }

  @Get()
  findAll(): Promise<DetailCustomerAtResponse[]> {
    return this.detailCustomerAtService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<DetailCustomerAtResponse> {
    return this.detailCustomerAtService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateDetailCustomerAtDto: UpdateDetailCustomerAtDto): Promise<ApiResponse<null>> {
    return this.detailCustomerAtService.update(id, updateDetailCustomerAtDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<ApiResponse<null>> {
    return this.detailCustomerAtService.remove(id);
  }
}
