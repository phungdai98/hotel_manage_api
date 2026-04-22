import { DetailStatus } from 'src/model';

export class DetailStatusResponse {
  id: string;
  dateStart: string;
  dateEnd: string;
  roomId: string;
  status: string;
  orderTicketId: string;
  
  constructor(detailStatus: DetailStatus) {
    this.id = detailStatus.id;
    this.dateStart = detailStatus.dateStart.toISOString();
    this.dateEnd = detailStatus.dateEnd.toISOString();
    this.roomId = detailStatus.roomId;
    this.status = detailStatus.status;
    this.orderTicketId = detailStatus.orderTicketId;
  }
}
