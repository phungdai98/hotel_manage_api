import { OrderTicket } from 'src/model';
import { DetailOrderTicketResponse } from '../../detail-order-ticket/entities/detail-order-ticket.entity';
import { CustomerResponse } from 'src/modules/customer/entities/customer.entity';

export class OrderTicketResponse {
  id: string;
  code: number;
  dateStart: string;
  dateEnd: string;
  status: string;
  customerId: string;
  userId: string | null;
  deposit: number;
  detailOrderTickets: DetailOrderTicketResponse[];
  customer?: CustomerResponse | null;

  constructor(orderTicket: OrderTicket) {
    this.id = orderTicket.id;
    this.code = orderTicket.code;
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
    this.customer = orderTicket.customer
      ? new CustomerResponse(orderTicket.customer)
      : null;
  }
}
