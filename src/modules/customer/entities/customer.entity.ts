import { Customer } from "src/model";

export class CustomerResponse {
    id: string;
    idCard: string;
    name: string;
    gender: boolean;
    phone: string;
    address: string;
    dateOfBirth: string;
    point: number | null;

    constructor(data: Customer) {
        this.id = data.id;
        this.idCard = data.idCard;
        this.name = data.name;
        this.gender = data.gender;
        this.phone = data.phone;
        this.address = data.address;
        this.dateOfBirth = data.dateOfBirth.toISOString();
        this.point = data.point ?? 0;
    }
}
