import { Sale } from 'src/model';

export class SaleResponse {
  id: string;
  name: string;
  dateStart: string;
  dateEnd: string;

  constructor(data: Sale) {
    this.id = data.id;
    this.name = data.name;
    this.dateStart = data.dateStart.toISOString();
    this.dateEnd = data.dateEnd.toISOString();
  }
}
