import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetailPriceServiceService } from './detail-price-service.service';
import { CreateDetailPriceServiceDto } from './dto/create-detail-price-service.dto';
import { UpdateDetailPriceServiceDto } from './dto/update-detail-price-service.dto';

@Controller('detail-price-service')
export class DetailPriceServiceController {
  constructor(private readonly detailPriceServiceService: DetailPriceServiceService) {}

  @Post()
  create(@Body() createDetailPriceServiceDto: CreateDetailPriceServiceDto) {
    return this.detailPriceServiceService.create(createDetailPriceServiceDto);
  }

  @Get()
  findAll() {
    return this.detailPriceServiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detailPriceServiceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetailPriceServiceDto: UpdateDetailPriceServiceDto) {
    return this.detailPriceServiceService.update(+id, updateDetailPriceServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detailPriceServiceService.remove(+id);
  }
}
