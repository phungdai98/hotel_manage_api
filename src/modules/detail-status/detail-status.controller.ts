import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { DetailStatusService } from './detail-status.service';
import { CreateDetailStatusDto } from './dto/create-detail-status.dto';
import { UpdateDetailStatusDto } from './dto/update-detail-status.dto';
import { BaseController } from 'src/common/base.controller';

@Controller('detail-status')
export class DetailStatusController extends BaseController {
  constructor(private readonly detailStatusService: DetailStatusService) {
    super();
  }

  @Post()
  create(@Body() createDetailStatusDto: CreateDetailStatusDto) {
    return this.detailStatusService.create(createDetailStatusDto);
  }

  @Get()
  findAll() {
    return this.detailStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.detailStatusService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateDetailStatusDto: UpdateDetailStatusDto) {
    return this.detailStatusService.update(id, updateDetailStatusDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.detailStatusService.remove(id);
  }
}
