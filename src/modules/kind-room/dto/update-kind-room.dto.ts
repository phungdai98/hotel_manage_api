import { PartialType } from '@nestjs/swagger';
import { CreateKindRoomDto } from './create-kind-room.dto';

export class UpdateKindRoomDto extends PartialType(CreateKindRoomDto) {}
