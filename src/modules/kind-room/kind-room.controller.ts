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
  create(@Body() createKindRoomDto: CreateKindRoomDto) {
    try {
      const result = this.kindRoomService.create(createKindRoomDto);
      if (!result) {
        return { message: 'Kind room not found' };
      }
      return result;
    } catch (error) {
      return error;
    }
  }

  @Get()
  findAll() {
    try {
      const result = this.kindRoomService.findAll();
      if (!result) {
        return { message: 'Kind room not found' };
      }
      return result;
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      const result = this.kindRoomService.findOne(id);
      if (!result) {
        return { message: 'Kind room not found' };
      }
      return result;
    } catch (error) {
      return error;
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKindRoomDto: UpdateKindRoomDto) {
    try {
      const result = this.kindRoomService.update(id, updateKindRoomDto);
      if (!result) {
        return { message: 'Kind room not found' };
      }
      return result;
    } catch (error) {
      return error;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      const result = this.kindRoomService.remove(id);
      if (!result) {
        return { message: 'Kind room not found' };
      }
      return result;
    } catch (error) {
      return error;
    }
  }
}
