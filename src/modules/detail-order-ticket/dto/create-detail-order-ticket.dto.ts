import { IsNumber, IsUUID } from "class-validator";

export class CreateDetailOrderTicketDto {
    @IsNumber()
    quantity: number;

    @IsUUID()
    rankRoomId: string;

}
