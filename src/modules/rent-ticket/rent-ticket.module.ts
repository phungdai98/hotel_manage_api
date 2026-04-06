import { Module } from '@nestjs/common';
import { RentTicketService } from './rent-ticket.service';
import { RentTicketController } from './rent-ticket.controller';

@Module({
  controllers: [RentTicketController],
  providers: [RentTicketService],
})
export class RentTicketModule {}
