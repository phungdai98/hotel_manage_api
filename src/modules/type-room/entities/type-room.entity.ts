import { TypeRoom } from "src/model";

export class TypeRoomResponse {
    id: string;
    name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }

    static fromEntity(entity: TypeRoom): TypeRoomResponse {
        return new TypeRoomResponse(entity.id, entity.name);
    }
}
