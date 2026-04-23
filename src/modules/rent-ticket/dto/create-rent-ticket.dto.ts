import {
  ArrayMinSize,
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateRentDto } from '../../rent/dto/create-rent.dto';

export class CreateRentTicketDto {
  @IsString()
  checkInDate: string;

  @IsString()
  @IsOptional()
  checkOutDate?: string;

  @IsBoolean()
  isPayed: boolean;

  @IsUUID()
  customerId: string;

  @IsUUID()
  orderTicketId: string;

  @Type(() => CreateRentDto)
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  rents: CreateRentDto[];
}
