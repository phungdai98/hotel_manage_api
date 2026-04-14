import { StatusRoom } from 'src/model';

export class StatusRoomResponse {
  id: string;
  name: string;
  constructor(statusRoom: StatusRoom) {
    this.id = statusRoom.id;
    this.name = statusRoom.name;
  }
}
