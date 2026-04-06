import { Injectable } from '@nestjs/common';
import { CreateDetailOrderTicketDto } from './dto/create-detail-order-ticket.dto';
import { UpdateDetailOrderTicketDto } from './dto/update-detail-order-ticket.dto';

@Injectable()
export class DetailOrderTicketService {
  create(createDetailOrderTicketDto: CreateDetailOrderTicketDto) {
    return 'This action adds a new detailOrderTicket';
  }

  findAll() {
    return `This action returns all detailOrderTicket`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detailOrderTicket`;
  }

  update(id: number, updateDetailOrderTicketDto: UpdateDetailOrderTicketDto) {
    return `This action updates a #${id} detailOrderTicket`;
  }

  remove(id: number) {
    return `This action removes a #${id} detailOrderTicket`;
  }
}
