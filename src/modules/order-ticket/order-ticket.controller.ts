import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderTicketService } from './order-ticket.service';
import { CreateOrderTicketDto } from './dto/create-order-ticket.dto';
import { UpdateOrderTicketDto } from './dto/update-order-ticket.dto';

@Controller('order-ticket')
export class OrderTicketController {
  constructor(private readonly orderTicketService: OrderTicketService) {}

  @Post()
  create(@Body() createOrderTicketDto: CreateOrderTicketDto) {
    return this.orderTicketService.create(createOrderTicketDto);
  }

  @Get()
  findAll() {
    return this.orderTicketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderTicketService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderTicketDto: UpdateOrderTicketDto) {
    return this.orderTicketService.update(+id, updateOrderTicketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderTicketService.remove(+id);
  }
}
