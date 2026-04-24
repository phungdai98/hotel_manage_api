import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BaseController } from 'src/common/base.controller';
import { ApiResponse } from 'src/common/entities/typeResponse';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomResponse } from './entities/room.entity';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController extends BaseController {
  constructor(private readonly roomService: RoomService) {
    super();
  }

  @Post()
  create(@Body() createRoomDto: CreateRoomDto): Promise<ApiResponse<null>> {
    return this.roomService.create(createRoomDto);
  }

  @Get()
  findAll(): Promise<RoomResponse[]> {
    return this.roomService.findAll();
  }

  @Get('available')
  findAvailableRoomsByRank(
    @Query('dateCheckIn') dateCheckIn: string,
    @Query('dateCheckOut') dateCheckOut: string,
    @Query('rankRoomId') rankRoomId: string,
  ): Promise<RoomResponse[]> {
    return this.roomService.findAvailableRoomsByRank(
      dateCheckIn,
      dateCheckOut,
      rankRoomId,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<RoomResponse> {
    return this.roomService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRoomDto: UpdateRoomDto,
  ): Promise<ApiResponse<null>> {
    return this.roomService.update(id, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<ApiResponse<null>> {
    return this.roomService.remove(id);
  }
}
