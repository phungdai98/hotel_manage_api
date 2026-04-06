import { PartialType } from '@nestjs/swagger';
import { CreateRankRoomDto } from './create-rank-room.dto';

export class UpdateRankRoomDto extends PartialType(CreateRankRoomDto) {}
