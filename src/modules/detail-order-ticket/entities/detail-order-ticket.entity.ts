import { DetailOrderTicket } from "src/model";

export class DetailOrderTicketResponse {
    id: string;
    quantity: number;
    orderTicketId: string;
    rankRoomId: string;

    constructor(data: DetailOrderTicket) {
        this.id = data.id;
        this.quantity = data.quantity;
        this.orderTicketId = data.orderTicketId;
        this.rankRoomId = data.rankRoomId;
    }
}
