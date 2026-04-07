import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    try {
      const result = this.roomService.create(createRoomDto);
      if (!result) {
        return { message: 'Room not found' };
      }
      return result;
    } catch (error) {
      return error;
    }
  }

  @Get()
  findAll() {
    try {
      const result = this.roomService.findAll();
      if (!result) {
        return { message: 'Room not found' };
      }
      return result;
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      const result = this.roomService.findOne(id);
      if (!result) {
        return { message: 'Room not found' };
      }
      return result;
    } catch (error) {
      return error;
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    try {
      const result = this.roomService.update(id, updateRoomDto);
      if (!result) {
        return { message: 'Room not found' };
      }
      return result;
    } catch (error) {
      return error;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      const result = this.roomService.remove(id);
      if (!result) {
        return { message: 'Room not found' };
      }
      return result;
    } catch (error) {
      return error;
    }
  }
}
