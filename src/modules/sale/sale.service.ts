import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from 'src/model';
import { Repository } from 'typeorm';
import { SaleResponse } from './entities/sale.entity';

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,
  ) {}
  async create(createSaleDto: CreateSaleDto) {
    try {
      const result = await this.saleRepository.save(createSaleDto);
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<SaleResponse[]> {
    try {
      const result = await this.saleRepository.find();
      return result.map((sale) => new SaleResponse(sale));
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: string): Promise<SaleResponse> {
    try {
      const result = await this.saleRepository.findOne({ where: { id: id } });
      if (!result) {
        throw new NotFoundException('Sale not found');
      }
      return new SaleResponse(result);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, updateSaleDto: UpdateSaleDto) {
    try {
      const result = await this.saleRepository.update(id, updateSaleDto);
      if (!result) {
        throw new NotFoundException('Sale not found');
      }
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const result = await this.saleRepository.delete(id);
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
