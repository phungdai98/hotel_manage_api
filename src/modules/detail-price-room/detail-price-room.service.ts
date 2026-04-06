import { Injectable } from '@nestjs/common';
import { CreateDetailPriceRoomDto } from './dto/create-detail-price-room.dto';
import { UpdateDetailPriceRoomDto } from './dto/update-detail-price-room.dto';

@Injectable()
export class DetailPriceRoomService {
  create(createDetailPriceRoomDto: CreateDetailPriceRoomDto) {
    return 'This action adds a new detailPriceRoom';
  }

  findAll() {
    return `This action returns all detailPriceRoom`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detailPriceRoom`;
  }

  update(id: number, updateDetailPriceRoomDto: UpdateDetailPriceRoomDto) {
    return `This action updates a #${id} detailPriceRoom`;
  }

  remove(id: number) {
    return `This action removes a #${id} detailPriceRoom`;
  }
}
