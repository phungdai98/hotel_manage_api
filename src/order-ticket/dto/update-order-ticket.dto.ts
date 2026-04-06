import { PartialType } from '@nestjs/swagger';
import { CreateOrderTicketDto } from './create-order-ticket.dto';

export class UpdateOrderTicketDto extends PartialType(CreateOrderTicketDto) {}
