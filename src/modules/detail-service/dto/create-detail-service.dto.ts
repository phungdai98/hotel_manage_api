import { IsBoolean, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateDetailServiceDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @IsBoolean()
    @IsNotEmpty()
    isPayed: boolean;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsUUID()
    @IsNotEmpty()
    serviceId: string;

    @IsUUID()
    @IsNotEmpty()
    rentId: string;
}
