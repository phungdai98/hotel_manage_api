import { Injectable } from '@nestjs/common';
import { CreateKindRoomDto } from './dto/create-kind-room.dto';
import { UpdateKindRoomDto } from './dto/update-kind-room.dto';

@Injectable()
export class KindRoomService {
  create(createKindRoomDto: CreateKindRoomDto) {
    return 'This action adds a new kindRoom';
  }

  findAll() {
    return `This action returns all kindRoom`;
  }

  findOne(id: number) {
    return `This action returns a #${id} kindRoom`;
  }

  update(id: number, updateKindRoomDto: UpdateKindRoomDto) {
    return `This action updates a #${id} kindRoom`;
  }

  remove(id: number) {
    return `This action removes a #${id} kindRoom`;
  }
}
