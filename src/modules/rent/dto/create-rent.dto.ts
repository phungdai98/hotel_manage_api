import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";

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

export class CalculateRentPriceDto {
    @IsString()
    roomId: string;

    @IsString()
    rentTicketId: string;
}

export class CalculateRentsPriceDto {
    @IsString()
    checkIn: string;

    @IsString()
    checkOut: string;

    @ValidateNested({ each: true })
    @Type(() => CalculateRentPriceDto)
    @IsArray()
    rents: CalculateRentPriceDto[]
}



export class GetPriceByCodeRentTicketDto {
    @IsNumber()
    codeRentTicket: number;

    @IsString()
    checkIn: string;

    @IsString()
    checkOut: string;

}
