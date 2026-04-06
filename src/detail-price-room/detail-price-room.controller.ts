import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetailPriceRoomService } from './detail-price-room.service';
import { CreateDetailPriceRoomDto } from './dto/create-detail-price-room.dto';
import { UpdateDetailPriceRoomDto } from './dto/update-detail-price-room.dto';

@Controller('detail-price-room')
export class DetailPriceRoomController {
  constructor(private readonly detailPriceRoomService: DetailPriceRoomService) {}

  @Post()
  create(@Body() createDetailPriceRoomDto: CreateDetailPriceRoomDto) {
    return this.detailPriceRoomService.create(createDetailPriceRoomDto);
  }

  @Get()
  findAll() {
    return this.detailPriceRoomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detailPriceRoomService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetailPriceRoomDto: UpdateDetailPriceRoomDto) {
    return this.detailPriceRoomService.update(+id, updateDetailPriceRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detailPriceRoomService.remove(+id);
  }
}
