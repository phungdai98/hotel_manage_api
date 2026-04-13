import { OrderTicket } from 'src/model';

export class OrderTicketResponse {
  id: string;
  dateStart: string;
  dateEnd: string;
  status: string;
  customerId: string;
  userId: string;

  constructor(orderTicket: OrderTicket) {
    this.id = orderTicket.id;
    this.dateStart = orderTicket.dateStart;
    this.dateEnd = orderTicket.dateEnd;
    this.status = orderTicket.status;
    this.customerId = orderTicket.customerId;
    this.userId = orderTicket.userId;
  }
}
