import { Module } from '@nestjs/common';
import { RentTicketService } from './rent-ticket.service';
import { RentTicketController } from './rent-ticket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentTicket } from 'src/model';

@Module({
  imports: [TypeOrmModule.forFeature([RentTicket])],
  controllers: [RentTicketController],
  providers: [RentTicketService],
})
export class RentTicketModule {}
