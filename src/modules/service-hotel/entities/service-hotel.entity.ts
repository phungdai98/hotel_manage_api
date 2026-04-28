import { Service } from 'src/model';

export class ServiceHotelResponse {
  id: string;
  code: string;
  name: string;
  price: number;
  

  constructor(data: IServiceHotelResponse ) {
    this.id = data.id || "";
    this.code = data.code || "";
    this.name = data.name || "";
    this.price = data.price || 0;
  }
}

export interface IServiceHotelResponse extends Partial<Service> {
    price: number;
}
