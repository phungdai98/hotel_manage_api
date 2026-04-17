import { IsString, IsUUID } from "class-validator";

export class CreateBillDto {
    @IsString()
    deription: string;

    @IsUUID()
    userId: string;

    @IsUUID()
    rentTicketId: string;
}
