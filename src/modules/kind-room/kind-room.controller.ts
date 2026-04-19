import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { KindRoomService } from './kind-room.service';
import { CreateKindRoomDto } from './dto/create-kind-room.dto';
import { UpdateKindRoomDto } from './dto/update-kind-room.dto';
import { BaseController } from 'src/common/base.controller';
import { ApiResponse } from 'src/common/entities/typeResponse';
import { KindRoomResponse } from './entities/kind-room.entity';

@Controller('kind-room')
export class KindRoomController extends BaseController {
  constructor(private readonly kindRoomService: KindRoomService) {
    super();
  }

  //Single Room , Double Room, Twin Room, Triple Room, Family Room, Connecting Room, Studio

  @Post()
  async create(
    @Body() createKindRoomDto: CreateKindRoomDto,
  ): Promise<ApiResponse<null>> {
    return this.kindRoomService.create(createKindRoomDto);
  }

  @Get()
  async findAll(): Promise<KindRoomResponse[]> {
    return this.kindRoomService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<KindRoomResponse> {
    return this.kindRoomService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateKindRoomDto: UpdateKindRoomDto,
  ): Promise<ApiResponse<null>> {
    return this.kindRoomService.update(id, updateKindRoomDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ApiResponse<null>> {
    return this.kindRoomService.remove(id);
  }
}
