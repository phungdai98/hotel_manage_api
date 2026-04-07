import { KindRoom } from 'src/model';

export class KindRoomResponse {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  static fromEntity(entity: KindRoom): KindRoomResponse {
    return new KindRoomResponse(entity.id, entity.name);
  }
}
