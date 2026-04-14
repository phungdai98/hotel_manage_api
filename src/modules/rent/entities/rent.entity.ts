import { Rent } from 'src/model';

export class RentResponse {
  id: string;
  surcharge: number;
  reason: Record<string, string> | null;
  isPayed: boolean;
  rentTicketId: string;
  roomId: string;
  billId: string;

  constructor(data: Rent) {
    this.id = data.id;
    this.surcharge = data.surcharge;
    this.reason = data.reason;
    this.isPayed = data.isPayed;
    this.rentTicketId = data.rentTicketId;
    this.roomId = data.roomId;
    this.billId = data.billId;
  }
}
