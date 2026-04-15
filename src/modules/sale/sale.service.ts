import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from 'src/model';
import { Repository } from 'typeorm';
import { SaleResponse } from './entities/sale.entity';
import { ApiResponse } from 'src/common/entities/typeResponse';
import { ErrorResponseWithStatusCode } from 'src/common/entities/errorEntity';

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,
  ) {}
  async create(createSaleDto: CreateSaleDto): Promise<ApiResponse<null>> {
    try {
      const result = await this.saleRepository.create(createSaleDto);
      await this.saleRepository.save(result);
      return new ApiResponse(true, null, 'Sale created successfully', 201);
    } catch (error: ErrorResponseWithStatusCode) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<SaleResponse[]> {
    try {
      const result = await this.saleRepository.find();
      return result.map((sale) => new SaleResponse(sale));
    } catch (error: ErrorResponseWithStatusCode) {
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
    } catch (error: ErrorResponseWithStatusCode) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, updateSaleDto: UpdateSaleDto): Promise<ApiResponse<null>> {
    try {
      const result = await this.saleRepository.update(id, updateSaleDto);
      if (!result) {
        throw new NotFoundException('Sale not found');
      }
      return new ApiResponse(true, null, 'Sale updated successfully', 200);
    } catch (error: ErrorResponseWithStatusCode) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const result = await this.saleRepository.findOne({ where: { id: id } });
      if (!result) {
        throw new NotFoundException('Sale not found');
      }
      await this.saleRepository.delete(id);
      return new ApiResponse(true, null, 'Sale deleted successfully', 200)  ;
    } catch (error: ErrorResponseWithStatusCode) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
