import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { DetailServiceService } from './detail-service.service';
import { CreateDetailServiceDto } from './dto/create-detail-service.dto';
import { UpdateDetailServiceDto } from './dto/update-detail-service.dto';
import { BaseController } from 'src/common/base.controller';

@Controller('detail-service')
export class DetailServiceController extends BaseController {
  constructor(private readonly detailServiceService: DetailServiceService) {
    super();
  }

  @Post()
  create(@Body() createDetailServiceDto: CreateDetailServiceDto) {
    return this.detailServiceService.create(createDetailServiceDto);
  }

  @Get()
  findAll() {
    return this.detailServiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.detailServiceService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateDetailServiceDto: UpdateDetailServiceDto) {
    return this.detailServiceService.update(id, updateDetailServiceDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.detailServiceService.remove(id);
  }
}
