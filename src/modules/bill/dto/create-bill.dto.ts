import { Type } from "class-transformer";
import { IsArray, IsNumber, IsString, IsUUID, ValidateNested } from "class-validator";
import { RentForBillDto } from "src/modules/rent/dto/create-rent.dto";

export class CreateBillDto {
    @IsString()
    description: string;

    @IsNumber()
    totalPrice: number;

    @IsNumber()
    priceRoom: number;

    @IsNumber()
    priceService: number;

    @IsUUID()
    userId: string;

    @IsUUID()
    rentTicketId: string;
}

export class CreateBillAndUpdateRentDto extends CreateBillDto {
    @ValidateNested({ each: true })
    @Type(() => RentForBillDto)
    @IsArray()
    rents: RentForBillDto[];
}
