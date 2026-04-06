import { Injectable } from '@nestjs/common';
import { CreateStatusRoomDto } from './dto/create-status-room.dto';
import { UpdateStatusRoomDto } from './dto/update-status-room.dto';

@Injectable()
export class StatusRoomService {
  create(createStatusRoomDto: CreateStatusRoomDto) {
    return 'This action adds a new statusRoom';
  }

  findAll() {
    return `This action returns all statusRoom`;
  }

  findOne(id: number) {
    return `This action returns a #${id} statusRoom`;
  }

  update(id: number, updateStatusRoomDto: UpdateStatusRoomDto) {
    return `This action updates a #${id} statusRoom`;
  }

  remove(id: number) {
    return `This action removes a #${id} statusRoom`;
  }
}
