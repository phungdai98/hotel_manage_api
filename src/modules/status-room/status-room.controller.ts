import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StatusRoomService } from './status-room.service';
import { CreateStatusRoomDto } from './dto/create-status-room.dto';
import { UpdateStatusRoomDto } from './dto/update-status-room.dto';

@Controller('status-room')
export class StatusRoomController {
  constructor(private readonly statusRoomService: StatusRoomService) {}

  @Post()
  create(@Body() createStatusRoomDto: CreateStatusRoomDto) {
    return this.statusRoomService.create(createStatusRoomDto);
  }

  @Get()
  findAll() {
    return this.statusRoomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusRoomService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatusRoomDto: UpdateStatusRoomDto) {
    return this.statusRoomService.update(+id, updateStatusRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusRoomService.remove(+id);
  }
}
