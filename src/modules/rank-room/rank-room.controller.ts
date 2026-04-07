import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RankRoomService } from './rank-room.service';
import { CreateRankRoomDto } from './dto/create-rank-room.dto';
import { UpdateRankRoomDto } from './dto/update-rank-room.dto';
import { BaseController } from 'src/common/base.controller';

@Controller('rank-room')
export class RankRoomController extends BaseController {
  constructor(private readonly rankRoomService: RankRoomService) {
    super();
  }

  @Post()
  create(@Body() createRankRoomDto: CreateRankRoomDto) {
    try {
      const result = this.rankRoomService.create(createRankRoomDto);
      if (!result) {
        return { message: 'Rank room not found' };
      }
      return result;
    } catch (error) {
      return error;
    }
  }

  @Get()
  findAll() {
    try {
      const result = this.rankRoomService.findAll();
      if (!result) {
        return { message: 'Rank room not found' };
      }
      return result;
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      const result = this.rankRoomService.findOne(id);
      if (!result) {
        return { message: 'Rank room not found' };
      }
      return result;
    } catch (error) {
      return error;
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRankRoomDto: UpdateRankRoomDto) {
    try {
      const result = this.rankRoomService.update(id, updateRankRoomDto);
      if (!result) {
        return { message: 'Rank room not found' };
      }
      return result;
    } catch (error) {
      return error;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      const result = this.rankRoomService.remove(id);
      if (!result) {
        return { message: 'Rank room not found' };
      }
      return result;
    } catch (error) {
      return error;
    }
  }
}
