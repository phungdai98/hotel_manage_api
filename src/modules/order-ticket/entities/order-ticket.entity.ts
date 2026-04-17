import { OrderTicket } from 'src/model';
import { DetailOrderTicketResponse } from '../../detail-order-ticket/entities/detail-order-ticket.entity';

export class OrderTicketResponse {
  id: string;
  dateStart: string;
  dateEnd: string;
  status: string;
  customerId: string;
  userId: string | null;
  deposit: number;
  detailOrderTickets: DetailOrderTicketResponse[];

  constructor(orderTicket: OrderTicket) {
    this.id = orderTicket.id;
    this.dateStart = orderTicket.dateStart.toISOString();
    this.dateEnd = orderTicket.dateEnd.toISOString();
    this.status = orderTicket.status;
    this.customerId = orderTicket.customerId;
    this.userId = orderTicket.userId ?? null;
    this.deposit = orderTicket.deposit ?? 0;
    this.detailOrderTickets = orderTicket.detailOrderTickets
      ? orderTicket.detailOrderTickets.map(
          (detail) => new DetailOrderTicketResponse(detail),
        )
      : [];
  }
}

