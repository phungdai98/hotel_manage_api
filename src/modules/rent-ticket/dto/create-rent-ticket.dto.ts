import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
  ValidateNested
} from 'class-validator';
import { CreateRentTicketDetailDto } from '../../rent/dto/create-rent.dto';
import { CreateCustomerDto } from 'src/modules/customer/dto/create-customer.dto';

export class CreateRentTicketDto {
  @IsString()
  checkInDate: string;

  @IsString()
  @IsOptional()
  checkOutDate?: string;

  @IsBoolean()
  isPayed: boolean;

  @IsUUID()
  @ValidateIf((obj) => !obj.customer)
  @IsOptional()
  customerId?: string;

  @IsInt()
  @IsOptional()
  orderCode?: number;

  @Type(() => CreateCustomerDto)
  @ValidateIf((obj) => !obj.customerId)
  @IsOptional()
  @ValidateNested()
  customer?: CreateCustomerDto;

  @Type(() => CreateRentTicketDetailDto)
  @ArrayMinSize(0)
  @ValidateNested({ each: true })
  rents: CreateRentTicketDetailDto[];
}
