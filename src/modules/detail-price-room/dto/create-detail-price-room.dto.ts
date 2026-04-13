import { IsDateString, IsNumber, IsUUID } from "class-validator";

export class CreateDetailPriceRoomDto {
    @IsNumber()
    price: number;

    @IsDateString()
    activeDate: string;

    @IsUUID()
    rankRoomId: string;
}
