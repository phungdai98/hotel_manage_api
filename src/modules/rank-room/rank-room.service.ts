import { Injectable } from '@nestjs/common';
import { CreateRankRoomDto } from './dto/create-rank-room.dto';
import { UpdateRankRoomDto } from './dto/update-rank-room.dto';

@Injectable()
export class RankRoomService {
  create(createRankRoomDto: CreateRankRoomDto) {
    return 'This action adds a new rankRoom';
  }

  findAll() {
    return `This action returns all rankRoom`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rankRoom`;
  }

  update(id: number, updateRankRoomDto: UpdateRankRoomDto) {
    return `This action updates a #${id} rankRoom`;
  }

  remove(id: number) {
    return `This action removes a #${id} rankRoom`;
  }
}
