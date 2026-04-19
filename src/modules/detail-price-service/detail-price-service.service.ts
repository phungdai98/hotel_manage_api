import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateDetailPriceServiceDto } from './dto/create-detail-price-service.dto';
import { UpdateDetailPriceServiceDto } from './dto/update-detail-price-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetailPriceService } from 'src/model';
import { Repository } from 'typeorm';
import { DetailPriceServiceResponse } from './entities/detail-price-service.entity';
import { ApiResponse } from 'src/common/entities/typeResponse';

@Injectable()
export class DetailPriceServiceService {
  constructor(
    @InjectRepository(DetailPriceService)
    private readonly detailPriceServiceRepository: Repository<DetailPriceService>,
  ) {}

  async create(
    createDetailPriceServiceDto: CreateDetailPriceServiceDto,
  ): Promise<ApiResponse<null>> {
    try {
      const detailPriceService = this.detailPriceServiceRepository.create(
        createDetailPriceServiceDto,
      );
      await this.detailPriceServiceRepository.save(detailPriceService);
      return new ApiResponse(
        true,
        null,
        `Create detail price service successfully`,
        200,
      );
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async findAll(): Promise<DetailPriceServiceResponse[]> {
    try {
      const detailPriceServices =
        await this.detailPriceServiceRepository.find();
      return detailPriceServices.map(
        (detailPriceService) =>
          new DetailPriceServiceResponse(detailPriceService),
      );
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async findOne(id: string): Promise<DetailPriceServiceResponse> {
    try {
      const detailPriceService =
        await this.detailPriceServiceRepository.findOne({ where: { id } });
      if (!detailPriceService) {
        throw new NotFoundException('Detail price service not found');
      }
      return new DetailPriceServiceResponse(detailPriceService);
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async update(
    id: string,
    updateDetailPriceServiceDto: UpdateDetailPriceServiceDto,
  ): Promise<ApiResponse<null>> {
    try {
      const detailPriceService =
        await this.detailPriceServiceRepository.findOne({ where: { id } });
      if (!detailPriceService) {
        throw new NotFoundException('Detail price service not found');
      }
      this.detailPriceServiceRepository.merge(
        detailPriceService,
        updateDetailPriceServiceDto,
      );
      await this.detailPriceServiceRepository.save(detailPriceService);
      return new ApiResponse(
        true,
        null,
        `Update detail ${id} price service successfully`,
        200,
      );
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async remove(id: string): Promise<ApiResponse<null>> {
    try {
      const detailPriceService =
        await this.detailPriceServiceRepository.findOne({ where: { id } });
      if (!detailPriceService) {
        throw new NotFoundException('Detail price service not found');
      }
      await this.detailPriceServiceRepository.remove(detailPriceService);
      return new ApiResponse(
        true,
        null,
        `Delete detail ${id} price service successfully`,
        200,
      );
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }
}
