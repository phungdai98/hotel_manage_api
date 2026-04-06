import { Injectable } from '@nestjs/common';
import { CreateDetailCustomerAtDto } from './dto/create-detail-customer-at.dto';
import { UpdateDetailCustomerAtDto } from './dto/update-detail-customer-at.dto';

@Injectable()
export class DetailCustomerAtService {
  create(createDetailCustomerAtDto: CreateDetailCustomerAtDto) {
    return 'This action adds a new detailCustomerAt';
  }

  findAll() {
    return `This action returns all detailCustomerAt`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detailCustomerAt`;
  }

  update(id: number, updateDetailCustomerAtDto: UpdateDetailCustomerAtDto) {
    return `This action updates a #${id} detailCustomerAt`;
  }

  remove(id: number) {
    return `This action removes a #${id} detailCustomerAt`;
  }
}
