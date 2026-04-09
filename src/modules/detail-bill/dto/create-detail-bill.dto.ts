import { IsNumber, IsUUID } from "class-validator";

export class CreateDetailBillDto {
    @IsUUID()
    billId: string;

    @IsUUID()
    roomId: string;

    @IsNumber()
    priceRoom: number;

    @IsNumber()
    priceService: number;
}
