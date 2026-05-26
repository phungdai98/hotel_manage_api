import { StatusRoomEnum } from 'src/common/enums/statusRoomEnum';
import { Room } from 'src/model';

export class RoomResponse {
  id: string;
  name: string;
  floor: string;
  rankRoomId: string;
  status: StatusRoomEnum;

  constructor(data: Room, status?: StatusRoomEnum) {
    this.id = data.id;
    this.name = data.name;
    this.floor = data.floor;
    this.rankRoomId = data.rankRoomId;
    this.status = status || StatusRoomEnum.RESERVED;
  }
}
