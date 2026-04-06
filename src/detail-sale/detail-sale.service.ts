import { Injectable } from '@nestjs/common';
import { CreateDetailSaleDto } from './dto/create-detail-sale.dto';
import { UpdateDetailSaleDto } from './dto/update-detail-sale.dto';

@Injectable()
export class DetailSaleService {
  create(createDetailSaleDto: CreateDetailSaleDto) {
    return 'This action adds a new detailSale';
  }

  findAll() {
    return `This action returns all detailSale`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detailSale`;
  }

  update(id: number, updateDetailSaleDto: UpdateDetailSaleDto) {
    return `This action updates a #${id} detailSale`;
  }

  remove(id: number) {
    return `This action removes a #${id} detailSale`;
  }
}
