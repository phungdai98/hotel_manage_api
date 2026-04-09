import { DetailBill } from "src/model";

export class DetailBillResponse {
    id: string;
    billId: string;
    roomId: string;
    priceRoom: number;
    priceService: number;

    constructor(data: DetailBill) {
        this.id = data.id;
        this.billId = data.billId;
        this.roomId = data.roomId;
        this.priceRoom = data.priceRoom;
        this.priceService = data.priceService;
    }
}
