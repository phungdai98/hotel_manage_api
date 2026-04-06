import { PartialType } from '@nestjs/swagger';
import { CreateStatusRoomDto } from './create-status-room.dto';

export class UpdateStatusRoomDto extends PartialType(CreateStatusRoomDto) {}
