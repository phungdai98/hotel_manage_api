import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { DetailPriceRoomService } from './detail-price-room.service';
import { CreateDetailPriceRoomDto } from './dto/create-detail-price-room.dto';
import { UpdateDetailPriceRoomDto } from './dto/update-detail-price-room.dto';
import { BaseController } from 'src/common/base.controller';
import { ApiResponse } from 'src/common/entities/typeResponse';
import { DetailPriceRoomResponse } from './entities/detail-price-room.entity';

@Controller('detail-price-room')
export class DetailPriceRoomController extends BaseController {
  constructor(private readonly detailPriceRoomService: DetailPriceRoomService) {
    super();
  }

  @Post()
  create(
    @Body() createDetailPriceRoomDto: CreateDetailPriceRoomDto,
  ): Promise<ApiResponse<null>> {
    return this.detailPriceRoomService.create(createDetailPriceRoomDto);
  }

  @Get()
  findAll(): Promise<DetailPriceRoomResponse[]> {
    return this.detailPriceRoomService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<DetailPriceRoomResponse> {
    return this.detailPriceRoomService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDetailPriceRoomDto: UpdateDetailPriceRoomDto,
  ): Promise<ApiResponse<null>> {
    return this.detailPriceRoomService.update(id, updateDetailPriceRoomDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<ApiResponse<null>> {
    return this.detailPriceRoomService.remove(id);
  }
}
