import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { BaseController } from 'src/common/base.controller';

@Controller('room')
export class RoomController extends BaseController {
  constructor(private readonly roomService: RoomService) {
    super();
  }

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

  @Get('available')
  findAllByRank(
    @Query('dateCheckIn') dateCheckIn: string,
    @Query('dateCheckOut') dateCheckOut: string,
    @Query('quantity') quantity: number,
  ) {
    try {
      return this.roomService.findAllByRank(
        new Date(dateCheckIn),
        new Date(dateCheckOut),
        Number(quantity),
      );
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
