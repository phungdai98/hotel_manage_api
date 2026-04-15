import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { DetailBillService } from './detail-bill.service';
import { CreateDetailBillDto } from './dto/create-detail-bill.dto';
import { UpdateDetailBillDto } from './dto/update-detail-bill.dto';
import { BaseController } from 'src/common/base.controller';
import { ApiResponse } from 'src/common/entities/typeResponse';
import { DetailBillResponse } from './entities/detail-bill.entity';

@Controller('detail-bill')
export class DetailBillController extends BaseController {
  constructor(private readonly detailBillService: DetailBillService) {
    super();
  }

  @Post()
  create(@Body() createDetailBillDto: CreateDetailBillDto): Promise<ApiResponse<null>> {
    return this.detailBillService.create(createDetailBillDto);
  }

  @Get()
  findAll(): Promise<DetailBillResponse[]> {
    return this.detailBillService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<DetailBillResponse> {
    return this.detailBillService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateDetailBillDto: UpdateDetailBillDto): Promise<ApiResponse<null>> {
    return this.detailBillService.update(id, updateDetailBillDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<ApiResponse<null>> {
    return this.detailBillService.remove(id);
  }
}
