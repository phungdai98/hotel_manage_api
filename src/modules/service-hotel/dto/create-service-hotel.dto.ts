import { IsString } from "class-validator";

export class CreateServiceHotelDto {
    @IsString()
    name: string;
}
