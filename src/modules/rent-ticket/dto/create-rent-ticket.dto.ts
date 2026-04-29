import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested
} from 'class-validator';
import { CreateRentTicketDetailDto } from '../../rent/dto/create-rent.dto';

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

  @IsInt()
  @IsOptional()
  orderCode?: number;

  @Type(() => CreateRentTicketDetailDto)
  @ArrayMinSize(0)
  @ValidateNested({ each: true })
  rents: CreateRentTicketDetailDto[];
}
