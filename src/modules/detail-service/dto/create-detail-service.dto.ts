import { IsBoolean, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateDetailServiceDto {
    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @IsUUID()
    @IsNotEmpty()
    serviceId: string;

    @IsString()
    @IsNotEmpty()
    roomName: string;
}
