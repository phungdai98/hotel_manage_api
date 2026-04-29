import { IsBoolean, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateDetailServiceDto {
    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @IsString()
    @IsNotEmpty()
    serviceCode: string;

    @IsString()
    @IsNotEmpty()
    roomName: string;
}
