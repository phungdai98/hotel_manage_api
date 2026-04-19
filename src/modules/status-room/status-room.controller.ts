import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { BaseController } from 'src/common/base.controller';
import { ApiResponse } from 'src/common/entities/typeResponse';
import { CreateStatusRoomDto } from './dto/create-status-room.dto';
import { UpdateStatusRoomDto } from './dto/update-status-room.dto';
import { StatusRoomResponse } from './entities/status-room.entity';
import { StatusRoomService } from './status-room.service';

@Controller('status-room')
export class StatusRoomController extends BaseController {
  constructor(private readonly statusRoomService: StatusRoomService) {
    super();
  }

  @Post()
  create(
    @Body() createStatusRoomDto: CreateStatusRoomDto,
  ): Promise<ApiResponse<null>> {
    return this.statusRoomService.create(createStatusRoomDto);
  }

  @Get()
  findAll(): Promise<StatusRoomResponse[]> {
    return this.statusRoomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<StatusRoomResponse> {
    return this.statusRoomService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateStatusRoomDto: UpdateStatusRoomDto,
  ): Promise<ApiResponse<null>> {
    return this.statusRoomService.update(id, updateStatusRoomDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<ApiResponse<null>> {
    return this.statusRoomService.remove(id);
  }
}
