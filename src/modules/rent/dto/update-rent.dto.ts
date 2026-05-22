import { PartialType } from '@nestjs/swagger';
import { CreateRentDto } from './create-rent.dto';
import { IsUUID } from 'class-validator';

export class UpdateRentDto extends PartialType(CreateRentDto) { }

export class UpdateRentBillDto {
    @IsUUID()
    rentId: string;
    @IsUUID()
    billId: string;
}
