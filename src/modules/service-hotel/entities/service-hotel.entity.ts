import { Service } from 'src/model';

export class ServiceHotelResponse {
  id: string;
  name: string;

  constructor(data: Service) {
    this.id = data.id;
    this.name = data.name;
  }
}
