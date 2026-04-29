import { DetailStatus } from 'src/model';

export class DetailStatusResponse {
  id: string;
  dateStart: string;
  dateEnd: string;
  roomId: string;
  status: string;
  rentTicketId?: string;
  
  constructor(detailStatus: DetailStatus) {
    this.id = detailStatus.id;
    this.dateStart = detailStatus.dateStart.toISOString();
    this.dateEnd = detailStatus.dateEnd.toISOString();
    this.roomId = detailStatus.roomId;
    this.status = detailStatus.status;
    this.rentTicketId = detailStatus.rentTicketId;
  }
}

export class RentTicketIdResponse {
  rentTicketId: string;
  roomId: string;

  constructor(data: Partial<RentTicketIdResponse>) {
    this.rentTicketId = data.rentTicketId || '';
    this.roomId = data.roomId || '';
  }
}
