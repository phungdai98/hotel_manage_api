import { DetailService } from 'src/model';

export class DetailServiceResponse {
  id: string;
  decription: string;
  amount: number;
  price: number;
  isPayed: boolean;
  serviceId: string;
  rentId: string;

  constructor(data: DetailService) {
    this.id = data.id;
    this.decription = data.decription;
    this.amount = data.amount;
    this.price = data.price;
    this.isPayed = data.isPayed;
    this.serviceId = data.serviceId;
    this.rentId = data.rentId;
  }
}
