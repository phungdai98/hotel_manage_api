import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { StatusRoomService } from './status-room.service';
import { CreateStatusRoomDto } from './dto/create-status-room.dto';
import { UpdateStatusRoomDto } from './dto/update-status-room.dto';
import { BaseController } from 'src/common/base.controller';

@Controller('status-room')
export class StatusRoomController extends BaseController {
  constructor(private readonly statusRoomService: StatusRoomService) {
    super();
  }

  @Post()
  create(@Body() createStatusRoomDto: CreateStatusRoomDto) {
    return this.statusRoomService.create(createStatusRoomDto);
  }

  @Get()
  findAll() {
    return this.statusRoomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.statusRoomService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateStatusRoomDto: UpdateStatusRoomDto) {
    return this.statusRoomService.update(id, updateStatusRoomDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.statusRoomService.remove(id);
  }
}
