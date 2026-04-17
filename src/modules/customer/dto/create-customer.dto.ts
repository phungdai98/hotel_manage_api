import { IsBoolean, IsDateString, IsString } from "class-validator";

export class CreateCustomerDto {
    @IsString()
    idCard: string;

    @IsString()
    name: string;

    @IsBoolean()
    gender: boolean;

    @IsString()
    phone: string;

    @IsString()
    address: string;

    @IsDateString()
    dateOfBirth: string;
}
