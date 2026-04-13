import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDetailPriceServiceDto } from './dto/create-detail-price-service.dto';
import { UpdateDetailPriceServiceDto } from './dto/update-detail-price-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetailPriceService } from 'src/model';
import { Repository } from 'typeorm';
import { DetailPriceServiceResponse } from './entities/detail-price-service.entity';
import { Response } from 'src/common/response';

@Injectable()
export class DetailPriceServiceService {
  constructor(
    @InjectRepository(DetailPriceService)
    private readonly detailPriceServiceRepository: Repository<DetailPriceService>,
  ) {}

  async create(createDetailPriceServiceDto: CreateDetailPriceServiceDto): Promise<Response> {
    try {
      const detailPriceService = this.detailPriceServiceRepository.create(createDetailPriceServiceDto);
      await this.detailPriceServiceRepository.save(detailPriceService);
      return new Response(`Create detail price service successfully`, 200);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<DetailPriceServiceResponse[]> {
    try {
      const detailPriceServices = await this.detailPriceServiceRepository.find();
      return detailPriceServices.map((detailPriceService) => new DetailPriceServiceResponse(detailPriceService));
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: string): Promise<DetailPriceServiceResponse> {
    try {
      const detailPriceService = await this.detailPriceServiceRepository.findOne({ where: { id } });
      if (!detailPriceService) {
        throw new NotFoundException('Detail price service not found');
      }
      return new DetailPriceServiceResponse(detailPriceService);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, updateDetailPriceServiceDto: UpdateDetailPriceServiceDto): Promise<Response> {
    try {
      const detailPriceService = await this.detailPriceServiceRepository.findOne({ where: { id } });
      if (!detailPriceService) {
        throw new NotFoundException('Detail price service not found');
      }
      this.detailPriceServiceRepository.merge(detailPriceService, updateDetailPriceServiceDto);
      await this.detailPriceServiceRepository.save(detailPriceService);
      return new Response(`Update detail ${id} price service successfully`, 200);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: string): Promise<Response> {
    try {
      const detailPriceService = await this.detailPriceServiceRepository.findOne({ where: { id } });
      if (!detailPriceService) {
        throw new NotFoundException('Detail price service not found');
      }
      await this.detailPriceServiceRepository.remove(detailPriceService);
      return new Response(`Delete detail ${id} price service successfully`, 200);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
