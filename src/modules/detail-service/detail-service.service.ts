import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDetailServiceDto } from './dto/create-detail-service.dto';
import { UpdateDetailServiceDto } from './dto/update-detail-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetailService } from 'src/model';
import { Repository } from 'typeorm';
import { Response } from 'src/common/response';
import { DetailServiceResponse } from './entities/detail-service.entity';

@Injectable()
export class DetailServiceService {
  constructor(
    @InjectRepository(DetailService)
    private readonly detailServiceRepository: Repository<DetailService>,
  ) {}

  async create(createDetailServiceDto: CreateDetailServiceDto): Promise<Response> {
    try {
      const detailService = this.detailServiceRepository.create(createDetailServiceDto);
      await this.detailServiceRepository.save(detailService);
      return new Response(`Create detail service successfully`, 200);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    try {
      const detailServices = await this.detailServiceRepository.find();
      return detailServices.map((detailService) => new DetailServiceResponse(detailService));
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: string): Promise<DetailServiceResponse> {
    try {
      const detailService = await this.detailServiceRepository.findOne({ where: { id } });
      if (!detailService) {
        throw new NotFoundException(`Detail service ${id} not found`);
      }
      return new DetailServiceResponse(detailService);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, updateDetailServiceDto: UpdateDetailServiceDto): Promise<Response> {
    try {
      const detailService = await this.detailServiceRepository.findOne({ where: { id } });
      if (!detailService) {
        throw new NotFoundException(`Detail service ${id} not found`);
      }
      this.detailServiceRepository.merge(detailService, updateDetailServiceDto);
      await this.detailServiceRepository.save(detailService);
      return new Response(`Update detail ${id} service successfully`, 200);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: string): Promise<Response> {
    try {
      const detailService = await this.detailServiceRepository.findOne({ where: { id } });
      if (!detailService) {
        throw new NotFoundException(`Detail service ${id} not found`);
      }
      await this.detailServiceRepository.remove(detailService);
      return new Response(`Delete detail ${id} service successfully`, 200);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
