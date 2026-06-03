import { DetailCustomerAt } from 'src/model';

export class DetailCustomerAtResponse {
  id: string;
  decription: string;
  customerId: string;
  rentId: string;
  name?: string;
  phone?: string;
  idCard?: string;
  address?: string;
  dateOfBirth?: Date;

  constructor(data: DetailCustomerAt) {
    this.id = data.id;
    this.decription = data.decription;
    this.customerId = data.customerId;
    this.rentId = data.rentId;
    this.name = data?.customer?.name || '';
    this.phone = data?.customer?.phone || '';
    this.idCard = data?.customer?.idCard || '';
    this.address = data?.customer?.address || '';
    this.dateOfBirth = data?.customer?.dateOfBirth || null;
  }
}
