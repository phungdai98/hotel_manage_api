import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { DetailOrderTicketService } from './detail-order-ticket.service';
import { CreateDetailOrderTicketDto } from './dto/create-detail-order-ticket.dto';
import { UpdateDetailOrderTicketDto } from './dto/update-detail-order-ticket.dto';
import { BaseController } from 'src/common/base.controller';

@Controller('detail-order-ticket')
export class DetailOrderTicketController extends BaseController {
  constructor(private readonly detailOrderTicketService: DetailOrderTicketService) {
    super();
  }

  @Post()
  create(@Body() createDetailOrderTicketDto: CreateDetailOrderTicketDto) {
    return this.detailOrderTicketService.create(createDetailOrderTicketDto);
  }

  @Get()
  findAll() {
    return this.detailOrderTicketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.detailOrderTicketService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateDetailOrderTicketDto: UpdateDetailOrderTicketDto) {
    return this.detailOrderTicketService.update(id, updateDetailOrderTicketDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.detailOrderTicketService.remove(id);
  }
}
