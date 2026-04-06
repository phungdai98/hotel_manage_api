import { Injectable } from '@nestjs/common';
import { CreateDetailPriceServiceDto } from './dto/create-detail-price-service.dto';
import { UpdateDetailPriceServiceDto } from './dto/update-detail-price-service.dto';

@Injectable()
export class DetailPriceServiceService {
  create(createDetailPriceServiceDto: CreateDetailPriceServiceDto) {
    return 'This action adds a new detailPriceService';
  }

  findAll() {
    return `This action returns all detailPriceService`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detailPriceService`;
  }

  update(id: number, updateDetailPriceServiceDto: UpdateDetailPriceServiceDto) {
    return `This action updates a #${id} detailPriceService`;
  }

  remove(id: number) {
    return `This action removes a #${id} detailPriceService`;
  }
}
