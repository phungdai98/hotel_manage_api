import { ArrayMinSize, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { OrderTicketStatusEnum } from 'src/common/enums/orderTicketStatus.enum';
import { CreateDetailOrderTicketDto } from "../../detail-order-ticket/dto/create-detail-order-ticket.dto";
import { Type } from "class-transformer";

export class CreateOrderTicketDto {
    @IsString()
    @IsNotEmpty()
    dateStart!: string;

    @IsString()
    @IsNotEmpty()
    dateEnd!: string;

    @IsEnum(OrderTicketStatusEnum)
    @IsNotEmpty()
    status!: OrderTicketStatusEnum;

    @IsString()
    @IsNotEmpty()
    customerId!: string;

    @IsString()
    @IsOptional()
    userId?: string;

    @IsNumber()
    @IsOptional()
    deposit?: number;

    @Type(() => CreateDetailOrderTicketDto)
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    details: CreateDetailOrderTicketDto[];
}

