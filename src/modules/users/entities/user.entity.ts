import { User } from "src/model";

export class UserResponse {
    id: string;
    idCard: string;
    email: string;
    name: string;
    phone: string;
    address: string;
    partId: string;
    role: string;
    partName?: string | null;

    constructor(user: User) {
        this.idCard = user.idCard;
        this.email = user.email;
        this.name = user.name;
        this.phone = user.phone;
        this.address = user.address;
        this.partId = user.partId;
        this.role = user.role;
        this.partName = user.part ? user.part.name : null;
    }
}