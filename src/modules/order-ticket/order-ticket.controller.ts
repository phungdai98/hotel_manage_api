import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { OrderTicketService } from './order-ticket.service';
import { CreateOrderTicketDto } from './dto/create-order-ticket.dto';
import { UpdateOrderTicketDto } from './dto/update-order-ticket.dto';
import { BaseController } from 'src/common/base.controller';
import { ApiResponse } from 'src/common/entities/typeResponse';
import { OrderTicketResponse } from './entities/order-ticket.entity';

@Controller('order-ticket')
export class OrderTicketController extends BaseController {
  constructor(private readonly orderTicketService: OrderTicketService) {
    super();
  }

  @Post()
  create(@Body() createOrderTicketDto: CreateOrderTicketDto): Promise<ApiResponse<OrderTicketResponse>> {
    return this.orderTicketService.create(createOrderTicketDto);
  }

  @Get()
  findAll(): Promise<OrderTicketResponse[]> {
    return this.orderTicketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<OrderTicketResponse | null> {
    return this.orderTicketService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateOrderTicketDto: UpdateOrderTicketDto): Promise<ApiResponse<null>> {
    return this.orderTicketService.update(id, updateOrderTicketDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<ApiResponse<null>> {
    return this.orderTicketService.remove(id);
  }
}
