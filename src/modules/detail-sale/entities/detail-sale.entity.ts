import { DetailSale } from 'src/model';

export class DetailSaleResponse {
  id: string;
  decription: string;
  ratio: number;
  saleId: string;
  rankRoomId: string;
  
  constructor(detailSale: DetailSale) {
    this.id = detailSale.id;
    this.decription = detailSale.decription;
    this.ratio = detailSale.ratio;
    this.saleId = detailSale.saleId;
    this.rankRoomId = detailSale.rankRoomId;
  }
}
