import { IsBoolean, IsString, IsUUID } from "class-validator";

export class CreateRentTicketDto {
    @IsString()
    checkInDate: string;
    @IsString()
    checkOutDate: string;
    @IsBoolean()
    isPayed: boolean;
    @IsUUID()
    customerId: string;
    @IsUUID()
    userId: string;
    @IsUUID()
    orderTicketId: string;
}
