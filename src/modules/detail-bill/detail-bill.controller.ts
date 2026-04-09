import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { DetailBillService } from './detail-bill.service';
import { CreateDetailBillDto } from './dto/create-detail-bill.dto';
import { UpdateDetailBillDto } from './dto/update-detail-bill.dto';

@Controller('detail-bill')
export class DetailBillController {
  constructor(private readonly detailBillService: DetailBillService) {}

  @Post()
  create(@Body() createDetailBillDto: CreateDetailBillDto) {
    return this.detailBillService.create(createDetailBillDto);
  }

  @Get()
  findAll() {
    return this.detailBillService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.detailBillService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateDetailBillDto: UpdateDetailBillDto) {
    return this.detailBillService.update(id, updateDetailBillDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.detailBillService.remove(id);
  }
}
