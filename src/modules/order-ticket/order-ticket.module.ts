import { Module } from '@nestjs/common';
import { OrderTicketService } from './order-ticket.service';
import { OrderTicketController } from './order-ticket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderTicket } from 'src/model';

@Module({
  imports:[TypeOrmModule.forFeature([OrderTicket])],
  controllers: [OrderTicketController],
  providers: [OrderTicketService],
})
export class OrderTicketModule {}
