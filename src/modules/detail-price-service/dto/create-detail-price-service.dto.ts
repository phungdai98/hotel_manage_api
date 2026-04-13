import { IsDateString, IsNumber, IsUUID } from "class-validator";

export class CreateDetailPriceServiceDto {
    @IsNumber()
    price: number;

    @IsDateString()
    activeDate: string;

    @IsUUID()
    serviceId: string;
}
