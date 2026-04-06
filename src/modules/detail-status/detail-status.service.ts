import { Injectable } from '@nestjs/common';
import { CreateDetailStatusDto } from './dto/create-detail-status.dto';
import { UpdateDetailStatusDto } from './dto/update-detail-status.dto';

@Injectable()
export class DetailStatusService {
  create(createDetailStatusDto: CreateDetailStatusDto) {
    return 'This action adds a new detailStatus';
  }

  findAll() {
    return `This action returns all detailStatus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detailStatus`;
  }

  update(id: number, updateDetailStatusDto: UpdateDetailStatusDto) {
    return `This action updates a #${id} detailStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} detailStatus`;
  }
}
