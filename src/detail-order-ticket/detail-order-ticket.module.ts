import { Module } from '@nestjs/common';
import { DetailOrderTicketService } from './detail-order-ticket.service';
import { DetailOrderTicketController } from './detail-order-ticket.controller';

@Module({
  controllers: [DetailOrderTicketController],
  providers: [DetailOrderTicketService],
})
export class DetailOrderTicketModule {}
