import { Bill } from 'src/model';

export class BillResponse {
  id: string;
  description: string;
  userId: string;
  rentTicketId: string;

  constructor(data: Bill) {
    this.id = data.id;
    this.description = data.description;
    this.userId = data.userId;
    this.rentTicketId = data.rentTicketId;
  }
}
