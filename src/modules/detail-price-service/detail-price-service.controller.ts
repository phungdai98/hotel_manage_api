import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { DetailPriceServiceService } from './detail-price-service.service';
import { CreateDetailPriceServiceDto } from './dto/create-detail-price-service.dto';
import { UpdateDetailPriceServiceDto } from './dto/update-detail-price-service.dto';
import { BaseController } from 'src/common/base.controller';
import { ApiResponse } from 'src/common/entities/typeResponse';
import { DetailPriceServiceResponse } from './entities/detail-price-service.entity';

@Controller('detail-price-service')
export class DetailPriceServiceController extends BaseController {
  constructor(private readonly detailPriceServiceService: DetailPriceServiceService) {
    super();
  }

  @Post()
  create(@Body() createDetailPriceServiceDto: CreateDetailPriceServiceDto): Promise<ApiResponse<null>> {
    return this.detailPriceServiceService.create(createDetailPriceServiceDto);
  }

  @Get()
  findAll(): Promise<DetailPriceServiceResponse[]> {
    return this.detailPriceServiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<DetailPriceServiceResponse> {
    return this.detailPriceServiceService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateDetailPriceServiceDto: UpdateDetailPriceServiceDto): Promise<ApiResponse<null>> {
    return this.detailPriceServiceService.update(id, updateDetailPriceServiceDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<ApiResponse<null>> {
    return this.detailPriceServiceService.remove(id);
  }
}
