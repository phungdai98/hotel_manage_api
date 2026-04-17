import { Controller, Get, Post, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';
import { ApiResponse } from 'src/common/entities/typeResponse';
import { OrderTicketResponse } from '../order-ticket/entities/order-ticket.entity';
import { Public } from '../auth/decorators/public.decorator';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @Public()
  create(@Body() orderDto: OrderDto): Promise<ApiResponse<OrderTicketResponse>> {
    return this.orderService.create(orderDto);
  }
}
