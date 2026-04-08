import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KindRoomService } from './kind-room.service';
import { CreateKindRoomDto } from './dto/create-kind-room.dto';
import { UpdateKindRoomDto } from './dto/update-kind-room.dto';
import { BaseController } from 'src/common/base.controller';

@Controller('kind-room')
export class KindRoomController extends BaseController {
  constructor(private readonly kindRoomService: KindRoomService) {
    super();
  }

  //Single Room , Double Room, Twin Room, Triple Room, Family Room, Connecting Room, Studio

  @Post()
  async create(@Body() createKindRoomDto: CreateKindRoomDto) {
    return this.kindRoomService.create(createKindRoomDto);
  }

  @Get()
  async findAll() {
    return this.kindRoomService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.kindRoomService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateKindRoomDto: UpdateKindRoomDto) {
    return this.kindRoomService.update(id, updateKindRoomDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.kindRoomService.remove(id);
  }
}
