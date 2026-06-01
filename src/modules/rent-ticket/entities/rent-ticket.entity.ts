import { RentTicket } from 'src/model';
import { RentResponse } from 'src/modules/rent/entities/rent.entity';

export class RentTicketResponse {
  id: string;
  code: number;
  dateStart: string;
  dateEnd: string;
  isPayed: boolean;
  customerId: string;
  userId: string;
  orderTicketId: string;
  rents: RentResponse[] | null;

  constructor(data: RentTicket) {
    this.id = data?.id || '';
    this.code = data?.code || 0;
    this.dateStart = String(data?.dateStart);
    this.dateEnd = String(data?.dateEnd);
    this.isPayed = data?.isPayed || false;
    this.customerId = data?.customerId || '';
    this.userId = data?.userId || '';
    this.orderTicketId = data?.orderTicketId || '';
    this.rents = data?.rents?.map((rent) => new RentResponse(rent)) || null;
  }
}
