import { IsString, IsUUID } from "class-validator";

export class CreateDetailStatusDto {
    @IsString()
    dateStart: string;

    @IsString()
    dateEnd: string;

    @IsUUID()
    roomId: string;

    @IsUUID()
    statusRoomId: string;

    @IsUUID()
    orderTicketId: string;
}
