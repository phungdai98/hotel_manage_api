import { Injectable } from '@nestjs/common';
import { CreateDetailBillDto } from './dto/create-detail-bill.dto';
import { UpdateDetailBillDto } from './dto/update-detail-bill.dto';

@Injectable()
export class DetailBillService {
  create(createDetailBillDto: CreateDetailBillDto) {
    return 'This action adds a new detailBill';
  }

  findAll() {
    return `This action returns all detailBill`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detailBill`;
  }

  update(id: number, updateDetailBillDto: UpdateDetailBillDto) {
    return `This action updates a #${id} detailBill`;
  }

  remove(id: number) {
    return `This action removes a #${id} detailBill`;
  }
}
