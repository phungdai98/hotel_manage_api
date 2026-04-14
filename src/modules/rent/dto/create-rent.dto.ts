import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateRentDto {
    @IsNumber()
    surcharge: number;
    @IsString()
    reason: Record<string, string>;
    @IsBoolean()
    isPayed: boolean;
    @IsString()
    rentTicketId: string;
    @IsString()
    roomId: string;
    @IsString()
    billId: string;
}
