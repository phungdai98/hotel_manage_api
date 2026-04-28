import { IsNumber, IsString } from "class-validator";

export class CreateServiceHotelDto {
    @IsString()
    code: string;
    
    @IsString()
    name: string;
}
