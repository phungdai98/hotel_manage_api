import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { DetailPriceRoomService } from './detail-price-room.service';
import { CreateDetailPriceRoomDto } from './dto/create-detail-price-room.dto';
import { UpdateDetailPriceRoomDto } from './dto/update-detail-price-room.dto';
import { BaseController } from 'src/common/base.controller';

@Controller('detail-price-room')
export class DetailPriceRoomController extends BaseController {
  constructor(private readonly detailPriceRoomService: DetailPriceRoomService) {
    super();
  }

  @Post()
  create(@Body() createDetailPriceRoomDto: CreateDetailPriceRoomDto) {
    return this.detailPriceRoomService.create(createDetailPriceRoomDto);
  }

  @Get()
  findAll() {
    return this.detailPriceRoomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.detailPriceRoomService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateDetailPriceRoomDto: UpdateDetailPriceRoomDto) {
    return this.detailPriceRoomService.update(id, updateDetailPriceRoomDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.detailPriceRoomService.remove(id);
  }
}
