import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { DetailStatusService } from './detail-status.service';
import { CreateDetailStatusDto } from './dto/create-detail-status.dto';
import { UpdateDetailStatusDto } from './dto/update-detail-status.dto';
import { BaseController } from 'src/common/base.controller';
import { ApiResponse } from 'src/common/entities/typeResponse';
import { DetailStatusResponse } from './entities/detail-status.entity';

@Controller('detail-status')
export class DetailStatusController extends BaseController {
  constructor(private readonly detailStatusService: DetailStatusService) {
    super();
  }

  @Post()
  create(@Body() createDetailStatusDto: CreateDetailStatusDto): Promise<ApiResponse<null>> {
    return this.detailStatusService.create(createDetailStatusDto);
  }

  @Get()
  findAll(): Promise<DetailStatusResponse[]> {
    return this.detailStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.detailStatusService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateDetailStatusDto: UpdateDetailStatusDto): Promise<ApiResponse<null>> {
    return this.detailStatusService.update(id, updateDetailStatusDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<ApiResponse<null>> {
    return this.detailStatusService.remove(id);
  }
}
