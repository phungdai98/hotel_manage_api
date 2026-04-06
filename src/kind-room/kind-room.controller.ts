import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KindRoomService } from './kind-room.service';
import { CreateKindRoomDto } from './dto/create-kind-room.dto';
import { UpdateKindRoomDto } from './dto/update-kind-room.dto';

@Controller('kind-room')
export class KindRoomController {
  constructor(private readonly kindRoomService: KindRoomService) {}

  @Post()
  create(@Body() createKindRoomDto: CreateKindRoomDto) {
    return this.kindRoomService.create(createKindRoomDto);
  }

  @Get()
  findAll() {
    return this.kindRoomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kindRoomService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKindRoomDto: UpdateKindRoomDto) {
    return this.kindRoomService.update(+id, updateKindRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kindRoomService.remove(+id);
  }
}
