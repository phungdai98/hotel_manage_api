import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse } from 'src/common/entities/typeResponse';
import { Public } from '../auth/decorators/public.decorator';
import { OrderTicketResponse } from '../order-ticket/entities/order-ticket.entity';
import { OrderDto } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @Public()
  create(
    @Body() orderDto: OrderDto,
  ): Promise<ApiResponse<OrderTicketResponse>> {
    return this.orderService.create(orderDto);
  }
}
