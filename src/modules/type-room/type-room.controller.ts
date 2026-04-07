import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
  create(@Body() createTypeRoomDto: CreateTypeRoomDto) {
    try {
      const result = this.typeRoomService.create(createTypeRoomDto);
      if (!result) {
        return { message: 'Type room not found' };
      }
      return result;
    } catch (error) {
      return error;
    }
  }

  @Get()
  findAll() {
    try {
      const result = this.typeRoomService.findAll();
      if (!result) {
        return { message: 'Type room not found' };
      }
      return result;
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      const result = this.typeRoomService.findOne(id);
      if (!result) {
        return { message: 'Type room not found' };
      }
      return result;
    } catch (error) {
      return error;
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypeRoomDto: UpdateTypeRoomDto) {
    try {
      const result = this.typeRoomService.update(id, updateTypeRoomDto);
      if (!result) {
        return { message: 'Type room not found' };
      }
      return result;
    } catch (error) {
      return error;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      const result = this.typeRoomService.remove(id);
      if (!result) {
        return { message: 'Type room not found' };
      }
      return result;
    } catch (error) {
      return error;
    }
  }
}
