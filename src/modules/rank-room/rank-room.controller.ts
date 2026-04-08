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
  async create(@Body() createRankRoomDto: CreateRankRoomDto) {
    return this.rankRoomService.create(createRankRoomDto);
  }

  @Get()
  async findAll() {
    return this.rankRoomService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.rankRoomService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRankRoomDto: UpdateRankRoomDto) {
    return this.rankRoomService.update(id, updateRankRoomDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.rankRoomService.remove(id);
  }
}
