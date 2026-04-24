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
    this.id = data?.id || '';
    this.dateStart = String(data?.dateStart);
    this.dateEnd = String(data?.dateEnd);
    this.isPayed = data?.isPayed || false;
    this.customerId = data?.customerId || '';
    this.userId = data?.userId || '';
    this.orderTicketId = data?.orderTicketId || '';
  }
}
