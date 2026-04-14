import { DetailPriceService } from "src/model";

export class DetailPriceServiceResponse {
    id: string;
    price: number;
    activeDate: string;
    serviceId: string;

    constructor(detailPriceService: DetailPriceService) {
        this.id = detailPriceService.id;
        this.price = detailPriceService.price;
        this.activeDate = detailPriceService.activeDate.toISOString();
        this.serviceId = detailPriceService.serviceId;
    }
}
