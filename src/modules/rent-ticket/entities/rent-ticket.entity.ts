import { RentTicket } from 'src/model';

export class RentTicketResponse {
  id: string;
  dateStart: string;
  dateEnd: string;
  isPayed: boolean;
  customerId: string;
  userId: string;
  orderTicketId: string;

  constructor(data: RentTicket) {
    this.id = data.id;
    this.dateStart = data.dateStart.toISOString();
    this.dateEnd = data.dateEnd.toISOString();
    this.isPayed = data.isPayed;
    this.customerId = data.customer.id;
    this.userId = data.user.id;
    this.orderTicketId = data.orderTicket.id;
  }
}
