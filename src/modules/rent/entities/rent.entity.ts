import { Rent } from 'src/model';
import { DetailCustomerAtResponse } from 'src/modules/detail-customer-at/entities/detail-customer-at.entity';

export class RentResponse {
  id: string;
  surcharge: number;
  reason: Record<string, string> | null;
  isPayed: boolean;
  rentTicketId: string;
  roomId: string;
  billId: string | null;
  roomName?: string;
  detailCustomerAts?: DetailCustomerAtResponse[] | null;

  constructor(data: Rent) {
    this.id = data.id;
    this.surcharge = data.surcharge;
    this.reason = data.reason;
    this.isPayed = data.isPayed;
    this.rentTicketId = data.rentTicketId;
    this.roomId = data.roomId;
    this.billId = data.billId || null;
    this.roomName = data.room?.name;
    this.detailCustomerAts =
      data.detailCustomerAts?.map(
        (detailCustomerAt) => new DetailCustomerAtResponse(detailCustomerAt),
      ) || null;
  }
}

export class RentCalculatePriceResponse extends RentResponse {
  quantityDate: number;
  totalPriceRoom: number;
  totalPriceService: number;
  totalPrice: number;

  constructor(data: Partial<RentCalculatePriceResponse>) {
    super(data as Rent);
    this.totalPriceRoom = data.totalPriceRoom || 0;
    this.totalPriceService = data.totalPriceService || 0;
    this.quantityDate = data.quantityDate || 0;
    this.totalPrice = this.totalPriceService + this.totalPriceRoom;
  }
}
