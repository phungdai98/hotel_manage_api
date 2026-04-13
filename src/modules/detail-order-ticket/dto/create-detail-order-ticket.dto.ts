import { IsNumber, IsString, IsUUID } from "class-validator";

export class CreateDetailOrderTicketDto {
    @IsNumber()
    quantity: number;

    @IsUUID()
    orderTicketId: string;

    @IsUUID()
    rankRoomId: string;
}
