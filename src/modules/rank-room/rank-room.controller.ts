import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RankRoomService } from './rank-room.service';
import { CreateRankRoomDto } from './dto/create-rank-room.dto';
import { UpdateRankRoomDto } from './dto/update-rank-room.dto';
import { BaseController } from 'src/common/base.controller';
import { ApiResponse } from 'src/common/entities/typeResponse';
import { RankRoomResponse } from './entities/rank-room.entity';

@Controller('rank-room')
export class RankRoomController extends BaseController {
  constructor(private readonly rankRoomService: RankRoomService) {
    super();
  }

  @Post()
  async create(@Body() createRankRoomDto: CreateRankRoomDto): Promise<ApiResponse<null>> {
    return this.rankRoomService.create(createRankRoomDto);
  }

  @Get()
  async findAll(): Promise<RankRoomResponse[]> {
    return this.rankRoomService.findAll();
  }

  @Get('available')
  async findAvailable(
    @Query('dateCheckIn') dateCheckIn: string,
    @Query('dateCheckOut') dateCheckOut: string,
    @Query('quantity') quantity: number,
  ): Promise<RankRoomResponse[]> {
    return this.rankRoomService.findAvailable(dateCheckIn, dateCheckOut, Number(quantity));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<RankRoomResponse> {
    return this.rankRoomService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRankRoomDto: UpdateRankRoomDto): Promise<ApiResponse<null>> {
    return this.rankRoomService.update(id, updateRankRoomDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ApiResponse<null>> {
    return this.rankRoomService.remove(id);
  }
}
