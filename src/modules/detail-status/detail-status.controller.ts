import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetailStatusService } from './detail-status.service';
import { CreateDetailStatusDto } from './dto/create-detail-status.dto';
import { UpdateDetailStatusDto } from './dto/update-detail-status.dto';

@Controller('detail-status')
export class DetailStatusController {
  constructor(private readonly detailStatusService: DetailStatusService) {}

  @Post()
  create(@Body() createDetailStatusDto: CreateDetailStatusDto) {
    return this.detailStatusService.create(createDetailStatusDto);
  }

  @Get()
  findAll() {
    return this.detailStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detailStatusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetailStatusDto: UpdateDetailStatusDto) {
    return this.detailStatusService.update(+id, updateDetailStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detailStatusService.remove(+id);
  }
}
