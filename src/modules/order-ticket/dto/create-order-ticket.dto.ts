import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { OrderTicketStatusEnum } from 'src/common/enums/orderTicketStatus.enum';

export class CreateOrderTicketDto {
    @IsString()
    @IsNotEmpty()
    dateStart: string;

    @IsString()
    @IsNotEmpty()
    dateEnd: string;

    @IsEnum(OrderTicketStatusEnum)
    @IsNotEmpty()
    status: OrderTicketStatusEnum;

    @IsString()
    @IsNotEmpty()
    customerId: string;

    @IsString()
    @IsNotEmpty()
    userId: string;
}
