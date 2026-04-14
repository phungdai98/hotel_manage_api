import { Room } from 'src/model';

export class RoomResponse {
  id: string;
  name: string;
  floor: number;
  rankRoomId: string;
  typeRoomId: string;

  constructor(data: Room) {
    this.id = data.id;
    this.name = data.name;
    this.floor = data.floor;
    this.rankRoomId = data.rankRoomId;
  }
}
