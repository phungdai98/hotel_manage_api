import { Injectable } from '@nestjs/common';
import { CreateOrderTicketDto } from './dto/create-order-ticket.dto';
import { UpdateOrderTicketDto } from './dto/update-order-ticket.dto';

@Injectable()
export class OrderTicketService {
  create(createOrderTicketDto: CreateOrderTicketDto) {
    return 'This action adds a new orderTicket';
  }

  findAll() {
    return `This action returns all orderTicket`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderTicket`;
  }

  update(id: number, updateOrderTicketDto: UpdateOrderTicketDto) {
    return `This action updates a #${id} orderTicket`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderTicket`;
  }
}
