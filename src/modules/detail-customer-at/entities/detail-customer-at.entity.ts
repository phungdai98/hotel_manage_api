import { DetailCustomerAt } from "src/model";

export class DetailCustomerAtResponse {
    id: string;
    decription: string;
    customerId: string;
    rentId: string;

    constructor(data: DetailCustomerAt) {
        this.id = data.id;
        this.decription = data.decription;
        this.customerId = data.customerId;
        this.rentId = data.rentId;
    }
}
