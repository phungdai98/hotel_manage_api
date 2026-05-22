import { IsNumber, IsString, IsUUID } from "class-validator";

export class CreateBillDto {
    @IsString()
    deription: string;

    @IsNumber()
    totalPrice: number;

    @IsNumber()
    priceRoom: number;

    @IsNumber()
    priceService: number;

    @IsUUID()
    userId: string;

    @IsUUID()
    rentTicketId: string;
}
