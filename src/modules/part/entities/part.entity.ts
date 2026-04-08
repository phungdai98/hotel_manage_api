import { Part } from "src/model";

export class PartResponse {
    id: string;
    name: string;

    constructor(part: Part) {
        this.id = part.id;
        this.name = part.name;
    }
}
