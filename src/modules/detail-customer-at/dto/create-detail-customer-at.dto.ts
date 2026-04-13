import { IsString, IsUUID } from "class-validator";

export class CreateDetailCustomerAtDto {
    @IsString()
    decription: string;

    @IsUUID()
    customerId: string;

    @IsString()
    @IsUUID()
    rentId: string;
}
