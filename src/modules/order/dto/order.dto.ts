import { Type } from 'class-transformer';
import { ArrayMinSize, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateDetailOrderTicketDto } from '../../detail-order-ticket/dto/create-detail-order-ticket.dto';
import { CreateCustomerDto } from 'src/modules/customer/dto/create-customer.dto';

export class OrderDto {
  @IsString()
  @IsNotEmpty()
  dateStart!: string;

  @IsString()
  @IsNotEmpty()
  dateEnd!: string;

  @IsNumber()
  @IsOptional()
  deposit?: number;

  @Type(() => CreateDetailOrderTicketDto)
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  details: CreateDetailOrderTicketDto[];

  @Type(() => CreateCustomerDto)
  @ValidateNested()
  customer: CreateCustomerDto;
}