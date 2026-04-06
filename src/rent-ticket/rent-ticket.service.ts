import { Injectable } from '@nestjs/common';
import { CreateRentTicketDto } from './dto/create-rent-ticket.dto';
import { UpdateRentTicketDto } from './dto/update-rent-ticket.dto';

@Injectable()
export class RentTicketService {
  create(createRentTicketDto: CreateRentTicketDto) {
    return 'This action adds a new rentTicket';
  }

  findAll() {
    return `This action returns all rentTicket`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rentTicket`;
  }

  update(id: number, updateRentTicketDto: UpdateRentTicketDto) {
    return `This action updates a #${id} rentTicket`;
  }

  remove(id: number) {
    return `This action removes a #${id} rentTicket`;
  }
}
