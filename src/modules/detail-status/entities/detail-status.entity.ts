import { DetailStatus } from 'src/model';

export class DetailStatusResponse {
  id: string;
  dateStart: string;
  dateEnd: string;
  roomId: string;
  statusRoomId: string;
  orderTicketId: string;
  
  constructor(detailStatus: DetailStatus) {
    this.id = detailStatus.id;
    this.dateStart = detailStatus.dateStart.toISOString();
    this.dateEnd = detailStatus.dateEnd.toISOString();
    this.roomId = detailStatus.roomId;
    this.statusRoomId = detailStatus.statusRoomId;
    this.orderTicketId = detailStatus.orderTicketId;
  }
}
