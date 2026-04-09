import { IsString, IsUUID } from "class-validator";

export class CreateBillDto {
    @IsString()
    decription: string;

    @IsUUID()
    userId: string;

    @IsUUID()
    rentTicketId: string;
}
