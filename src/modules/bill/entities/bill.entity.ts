import { Bill } from "src/model";

export class BillResponse {
    id: string;
    decription: string;
    userId: string;
    rentTicketId: string;

    constructor(data: Bill) {
        this.id = data.id;
        this.decription = data.decription;
        this.userId = data.userId;
        this.rentTicketId = data.rentTicketId;
    }
}
