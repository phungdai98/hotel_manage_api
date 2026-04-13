import { DetailPriceRoom } from "src/model";

export class DetailPriceRoomResponse {
    id: string;
    price: number;
    activeDate: string;
    rankRoomId: string;

    constructor(detailPriceRoom: DetailPriceRoom) {
        this.id = detailPriceRoom.id;
        this.price = detailPriceRoom.price;
        this.activeDate = detailPriceRoom.activeDate.toISOString();
        this.rankRoomId = detailPriceRoom.rankRoomId;
    }
}
