import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { OrderTicketService } from './order-ticket.service';
import { CreateOrderTicketDto } from './dto/create-order-ticket.dto';
import { UpdateOrderTicketDto } from './dto/update-order-ticket.dto';
import { BaseController } from 'src/common/base.controller';

@Controller('order-ticket')
export class OrderTicketController extends BaseController {
  constructor(private readonly orderTicketService: OrderTicketService) {
    super();
  }

  @Post()
  create(@Body() createOrderTicketDto: CreateOrderTicketDto) {
    return this.orderTicketService.create(createOrderTicketDto);
  }

  @Get()
  findAll() {
    return this.orderTicketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderTicketService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateOrderTicketDto: UpdateOrderTicketDto) {
    return this.orderTicketService.update(id, updateOrderTicketDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderTicketService.remove(id);
  }
}
