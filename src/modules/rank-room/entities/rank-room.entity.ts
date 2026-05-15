import { RankRoom } from 'src/model';

export class RankRoomResponse {
  id: string;
  urlImage: string;
  limitPeople: number;
  kindRoomId: string;
  typeRoomId: string;
  typeRoomName: string;
  kindRoomName: string;
  availableCount?: number;
  price: number;

  constructor(
    data: RankRoom,
    price?: number
  ) {
    this.id = data.id;
    this.urlImage = data.urlImage;
    this.limitPeople = data.limitPeople;
    this.kindRoomId = data.kindRoomId;
    this.typeRoomId = data.typeRoomId;
    this.typeRoomName = data.typeRoom?.name || '';
    this.kindRoomName = data.kindRoom?.name || '';
    this.price = price || 0;
  }
}
