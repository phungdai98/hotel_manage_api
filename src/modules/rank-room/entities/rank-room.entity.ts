import { RankRoom } from 'src/model';

export class RankRoomResponse {
  id: string;
  urlImage: string;
  limitPeople: number;
  kindRoomId: string;
  typeRoomId: string;
  typeRoomName: string;
  kindRoomName: string;

  constructor(
    id: string,
    urlImage: string,
    limitPeople: number,
    kindRoomId: string,
    typeRoomId: string,
    typeRoomName?: string,
    kindRoomName?: string,
  ) {
    this.id = id;
    this.urlImage = urlImage;
    this.limitPeople = limitPeople;
    this.kindRoomId = kindRoomId;
    this.typeRoomId = typeRoomId;
    this.typeRoomName = typeRoomName || '';
    this.kindRoomName = kindRoomName || '';
  }

  static fromEntity(entity: RankRoom): RankRoomResponse {
    return new RankRoomResponse(
      entity.id,
      entity.urlImage,
      entity.limitPeople,
      entity.kindRoomId,
      entity.typeRoomId,
      entity?.typeRoom?.name,
      entity?.kindRoom?.name,
    );
  }
}
