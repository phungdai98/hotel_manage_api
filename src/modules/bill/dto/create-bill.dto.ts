import { IsArray, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateBillDto {
    @IsString()
    description: string;

    @IsUUID()
    userId: string;

    @IsNumber()
    codeTicketId: number;
}

export class CreateBillAndUpdateRentDto extends CreateBillDto {
    @IsString()
    checkIn: string;

    @IsString()
    checkOut: string;

    @IsArray()
    @IsUUID('all', { each: true })
    rents: string[];
}
