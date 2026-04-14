import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { TypeRoomService } from './type-room.service';
import { CreateTypeRoomDto } from './dto/create-type-room.dto';
import { UpdateTypeRoomDto } from './dto/update-type-room.dto';
import { BaseController } from 'src/common/base.controller';

@Controller('type-room')
export class TypeRoomController extends BaseController {
  constructor(private readonly typeRoomService: TypeRoomService) {
    super();
  }
  //Standard Room, Superior Room, Deluxe Room, Suite Room, Presidential Suite
  @Post()
  async create(@Body() createTypeRoomDto: CreateTypeRoomDto) {
    return this.typeRoomService.create(createTypeRoomDto);
  }

  @Get()
  async findAll() {
    return this.typeRoomService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.typeRoomService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateTypeRoomDto: UpdateTypeRoomDto) {
    return this.typeRoomService.update(id, updateTypeRoomDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.typeRoomService.remove(id);
  }
}
