import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDetailSaleDto } from './dto/create-detail-sale.dto';
import { UpdateDetailSaleDto } from './dto/update-detail-sale.dto';
import { Repository } from 'typeorm';
import { DetailSale } from 'src/model';
import { DetailSaleResponse } from './entities/detail-sale.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponse } from 'src/common/entities/typeResponse';
import { ErrorResponseWithStatusCode } from 'src/common/entities/errorEntity';

@Injectable()
export class DetailSaleService {
  constructor(
    @InjectRepository(DetailSale)
    private readonly detailSaleRepository: Repository<DetailSale>,
  ) {}

  async create(createDetailSaleDto: CreateDetailSaleDto): Promise<ApiResponse<null>> {
    try {
      const detailSale = this.detailSaleRepository.create(createDetailSaleDto);
      await this.detailSaleRepository.save(detailSale);
      return new ApiResponse(true, null, `Create detail sale successfully`, 200);
    } catch (error: ErrorResponseWithStatusCode) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<DetailSaleResponse[]> {
    try {
      const detailSales = await this.detailSaleRepository.find();
      return detailSales.map((detailSale) => new DetailSaleResponse(detailSale));
    } catch (error: ErrorResponseWithStatusCode) {
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
    } catch (error: ErrorResponseWithStatusCode) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, updateDetailSaleDto: UpdateDetailSaleDto): Promise<ApiResponse<null>> {
    try {
      const detailSale = await this.detailSaleRepository.findOne({ where: { id } });
      if (!detailSale) {
        throw new NotFoundException(`Detail sale ${id} not found`);
      }
      this.detailSaleRepository.merge(detailSale, updateDetailSaleDto);
      await this.detailSaleRepository.save(detailSale);
      return new ApiResponse(true, null, `Update detail ${id} sale successfully`, 200);
    } catch (error: ErrorResponseWithStatusCode) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: string): Promise<ApiResponse<null>> {
    try {
      const detailSale = await this.detailSaleRepository.findOne({ where: { id } });
      if (!detailSale) {
        throw new NotFoundException(`Detail sale ${id} not found`);
      }
      await this.detailSaleRepository.remove(detailSale);
      return new ApiResponse(true, null, `Delete detail ${id} sale successfully`, 200);
    } catch (error: ErrorResponseWithStatusCode) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
