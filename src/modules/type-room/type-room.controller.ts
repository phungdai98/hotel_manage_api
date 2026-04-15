import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { TypeRoomService } from './type-room.service';
import { CreateTypeRoomDto } from './dto/create-type-room.dto';
import { UpdateTypeRoomDto } from './dto/update-type-room.dto';
import { BaseController } from 'src/common/base.controller';
import { ApiResponse } from 'src/common/entities/typeResponse';
import { TypeRoomResponse } from './entities/type-room.entity';

@Controller('type-room')
export class TypeRoomController extends BaseController {
  constructor(private readonly typeRoomService: TypeRoomService) {
    super();
  }
  //Standard Room, Superior Room, Deluxe Room, Suite Room, Presidential Suite
  @Post()
  async create(@Body() createTypeRoomDto: CreateTypeRoomDto): Promise<ApiResponse<null>> {
    return this.typeRoomService.create(createTypeRoomDto);
  }

  @Get()
  async findAll(): Promise<TypeRoomResponse[]> {
    return this.typeRoomService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<TypeRoomResponse> {
    return this.typeRoomService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateTypeRoomDto: UpdateTypeRoomDto): Promise<ApiResponse<null>> {
    return this.typeRoomService.update(id, updateTypeRoomDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<ApiResponse<null>> {
    return this.typeRoomService.remove(id);
  }
}
