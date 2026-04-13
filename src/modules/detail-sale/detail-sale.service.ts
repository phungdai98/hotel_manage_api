import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDetailSaleDto } from './dto/create-detail-sale.dto';
import { UpdateDetailSaleDto } from './dto/update-detail-sale.dto';
import { Response } from 'src/common/response';
import { Repository } from 'typeorm';
import { DetailSale } from 'src/model';
import { DetailSaleResponse } from './entities/detail-sale.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DetailSaleService {
  constructor(
    @InjectRepository(DetailSale)
    private readonly detailSaleRepository: Repository<DetailSale>,
  ) {}

  async create(createDetailSaleDto: CreateDetailSaleDto): Promise<Response> {
    try {
      const detailSale = this.detailSaleRepository.create(createDetailSaleDto);
      await this.detailSaleRepository.save(detailSale);
      return new Response(`Create detail sale successfully`, 200);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    try {
      const detailSales = await this.detailSaleRepository.find();
      return detailSales.map((detailSale) => new DetailSaleResponse(detailSale));
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: string): Promise<DetailSaleResponse> {
    try {
      const detailSale = await this.detailSaleRepository.findOne({ where: { id } });
      if (!detailSale) {
        throw new NotFoundException(`Detail sale ${id} not found`);
      }
      return new DetailSaleResponse(detailSale);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, updateDetailSaleDto: UpdateDetailSaleDto): Promise<Response> {
    try {
      const detailSale = await this.detailSaleRepository.findOne({ where: { id } });
      if (!detailSale) {
        throw new NotFoundException(`Detail sale ${id} not found`);
      }
      this.detailSaleRepository.merge(detailSale, updateDetailSaleDto);
      await this.detailSaleRepository.save(detailSale);
      return new Response(`Update detail ${id} sale successfully`, 200);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: string): Promise<Response> {
    try {
      const detailSale = await this.detailSaleRepository.findOne({ where: { id } });
      if (!detailSale) {
        throw new NotFoundException(`Detail sale ${id} not found`);
      }
      await this.detailSaleRepository.remove(detailSale);
      return new Response(`Delete detail ${id} sale successfully`, 200);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
