import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RankRoomService } from './rank-room.service';
import { CreateRankRoomDto } from './dto/create-rank-room.dto';
import { UpdateRankRoomDto } from './dto/update-rank-room.dto';

@Controller('rank-room')
export class RankRoomController {
  constructor(private readonly rankRoomService: RankRoomService) {}

  @Post()
  create(@Body() createRankRoomDto: CreateRankRoomDto) {
    return this.rankRoomService.create(createRankRoomDto);
  }

  @Get()
  findAll() {
    return this.rankRoomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rankRoomService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRankRoomDto: UpdateRankRoomDto) {
    return this.rankRoomService.update(+id, updateRankRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rankRoomService.remove(+id);
  }
}
