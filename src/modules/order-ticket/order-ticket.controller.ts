import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BaseController } from 'src/common/base.controller';
import { ApiResponse } from 'src/common/entities/typeResponse';
import { CreateOrderTicketDto } from './dto/create-order-ticket.dto';
import { ReqFindAllOrderTicketDto } from './dto/req-order-ticket.dto';
import { UpdateOrderTicketDto } from './dto/update-order-ticket.dto';
import { OrderTicketResponse } from './entities/order-ticket.entity';
import { OrderTicketService } from './order-ticket.service';

@Controller('order-ticket')
export class OrderTicketController extends BaseController {
  constructor(private readonly orderTicketService: OrderTicketService) {
    super();
  }

  @Post()
  create(
    @Body() createOrderTicketDto: CreateOrderTicketDto,
  ): Promise<ApiResponse<OrderTicketResponse>> {
    return this.orderTicketService.create(createOrderTicketDto);
  }

  @Get()
  findAll(
    @Query() query: ReqFindAllOrderTicketDto,
  ): Promise<OrderTicketResponse[]> {
    return this.orderTicketService.findAll(query);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<OrderTicketResponse | null> {
    return this.orderTicketService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOrderTicketDto: UpdateOrderTicketDto,
  ): Promise<ApiResponse<null>> {
    return this.orderTicketService.update(id, updateOrderTicketDto);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: { status: string },
  ): Promise<ApiResponse<null>> {
    return this.orderTicketService.updateStatus(id, body.status);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<ApiResponse<null>> {
    return this.orderTicketService.remove(id);
  }
}
