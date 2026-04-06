import { PartialType } from '@nestjs/swagger';
import { CreateRentTicketDto } from './create-rent-ticket.dto';

export class UpdateRentTicketDto extends PartialType(CreateRentTicketDto) {}
