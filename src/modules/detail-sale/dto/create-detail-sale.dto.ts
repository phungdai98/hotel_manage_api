import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateDetailSaleDto {
    @IsString()
    decription: string;

    @IsNumber()
    @IsNotEmpty()
    ratio: number;

    @IsString()
    @IsNotEmpty()
    saleId: string;

    @IsString()
    @IsNotEmpty()
    rankRoomId: string;
}
