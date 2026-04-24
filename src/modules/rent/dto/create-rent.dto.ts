import { IsBoolean, IsNumber, IsObject, IsOptional, IsString } from "class-validator";

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

export class CreateRentTicketDetailDto {
   @IsNumber()
    surcharge: number;

    @IsObject()
    @IsOptional()
    reason: Record<string, string>;

    @IsBoolean()
    isPayed: boolean;

    @IsString()
    roomId: string;
}
