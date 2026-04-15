import { Module } from '@nestjs/common';
import { DetailOrderTicketService } from './detail-order-ticket.service';
import { DetailOrderTicketController } from './detail-order-ticket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailOrderTicket } from 'src/model';

@Module({
  imports: [TypeOrmModule.forFeature([DetailOrderTicket])],
  controllers: [DetailOrderTicketController],
  providers: [DetailOrderTicketService],
  exports: [DetailOrderTicketService],
})
export class DetailOrderTicketModule {}
