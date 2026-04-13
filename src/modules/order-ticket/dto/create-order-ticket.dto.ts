import { IsNotEmpty, IsString } from "class-validator";

export class CreateOrderTicketDto {
    @IsString()
    @IsNotEmpty()
    dateStart: string;

    @IsString()
    @IsNotEmpty()
    dateEnd: string;

    @IsString()
    @IsNotEmpty()
    status: string;

    @IsString()
    @IsNotEmpty()
    customerId: string;

    @IsString()
    @IsNotEmpty()
    userId: string;
}
