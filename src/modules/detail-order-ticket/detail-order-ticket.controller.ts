import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { DetailOrderTicketService } from './detail-order-ticket.service';
import { CreateDetailOrderTicketDto } from './dto/create-detail-order-ticket.dto';
import { UpdateDetailOrderTicketDto } from './dto/update-detail-order-ticket.dto';
import { BaseController } from 'src/common/base.controller';
import { ApiResponse } from 'src/common/entities/typeResponse';
import { DetailOrderTicketResponse } from './entities/detail-order-ticket.entity';

@Controller('detail-order-ticket')
export class DetailOrderTicketController extends BaseController {
  constructor(private readonly detailOrderTicketService: DetailOrderTicketService) {
    super();
  }

  @Post()
  create(@Body() createDetailOrderTicketDto: CreateDetailOrderTicketDto): Promise<ApiResponse<null>> {
    return this.detailOrderTicketService.create(createDetailOrderTicketDto);
  }

  @Get()
  findAll(): Promise<DetailOrderTicketResponse[]> {
    return this.detailOrderTicketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.detailOrderTicketService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateDetailOrderTicketDto: UpdateDetailOrderTicketDto): Promise<ApiResponse<null>> {
    return this.detailOrderTicketService.update(id, updateDetailOrderTicketDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<ApiResponse<null>> {
    return this.detailOrderTicketService.remove(id);
  }
}
