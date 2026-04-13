import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { DetailSaleService } from './detail-sale.service';
import { CreateDetailSaleDto } from './dto/create-detail-sale.dto';
import { UpdateDetailSaleDto } from './dto/update-detail-sale.dto';

@Controller('detail-sale')
export class DetailSaleController {
  constructor(private readonly detailSaleService: DetailSaleService) {}

  @Post()
  create(@Body() createDetailSaleDto: CreateDetailSaleDto) {
    return this.detailSaleService.create(createDetailSaleDto);
  }

  @Get()
  findAll() {
    return this.detailSaleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.detailSaleService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateDetailSaleDto: UpdateDetailSaleDto) {
    return this.detailSaleService.update(id, updateDetailSaleDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.detailSaleService.remove(id);
  }
}
