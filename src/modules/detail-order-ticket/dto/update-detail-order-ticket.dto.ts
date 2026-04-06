import { PartialType } from '@nestjs/swagger';
import { CreateDetailOrderTicketDto } from './create-detail-order-ticket.dto';

export class UpdateDetailOrderTicketDto extends PartialType(CreateDetailOrderTicketDto) {}
