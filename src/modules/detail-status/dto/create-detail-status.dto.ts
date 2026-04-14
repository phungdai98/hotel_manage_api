import { IsDateString, IsUUID } from "class-validator";

export class CreateDetailStatusDto {
    @IsDateString()
    dateStart: string;

    @IsDateString()
    dateEnd: string;

    @IsUUID()
    roomId: string;

    @IsUUID()
    statusRoomId: string;

    @IsUUID()
    orderTicketId: string;
}
