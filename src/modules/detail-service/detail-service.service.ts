import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateDetailServiceDto } from './dto/create-detail-service.dto';
import { UpdateDetailServiceDto } from './dto/update-detail-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetailService } from 'src/model';
import { Repository } from 'typeorm';
import { DetailServiceResponse } from './entities/detail-service.entity';
import { ApiResponse } from 'src/common/entities/typeResponse';

@Injectable()
export class DetailServiceService {
  constructor(
    @InjectRepository(DetailService)
    private readonly detailServiceRepository: Repository<DetailService>,
  ) {}

  async create(
    createDetailServiceDto: CreateDetailServiceDto,
  ): Promise<ApiResponse<null>> {
    try {
      const detailService = this.detailServiceRepository.create(
        createDetailServiceDto,
      );
      await this.detailServiceRepository.save(detailService);
      return new ApiResponse(
        true,
        null,
        `Create detail service successfully`,
        200,
      );
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async findAll(): Promise<DetailServiceResponse[]> {
    try {
      const detailServices = await this.detailServiceRepository.find();
      return detailServices.map(
        (detailService) => new DetailServiceResponse(detailService),
      );
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async findOne(id: string): Promise<DetailServiceResponse> {
    try {
      const detailService = await this.detailServiceRepository.findOne({
        where: { id },
      });
      if (!detailService) {
        throw new NotFoundException(`Detail service ${id} not found`);
      }
      return new DetailServiceResponse(detailService);
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async update(
    id: string,
    updateDetailServiceDto: UpdateDetailServiceDto,
  ): Promise<ApiResponse<null>> {
    try {
      const detailService = await this.detailServiceRepository.findOne({
        where: { id },
      });
      if (!detailService) {
        throw new NotFoundException(`Detail service ${id} not found`);
      }
      this.detailServiceRepository.merge(detailService, updateDetailServiceDto);
      await this.detailServiceRepository.save(detailService);
      return new ApiResponse(
        true,
        null,
        `Update detail ${id} service successfully`,
        200,
      );
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async remove(id: string): Promise<ApiResponse<null>> {
    try {
      const detailService = await this.detailServiceRepository.findOne({
        where: { id },
      });
      if (!detailService) {
        throw new NotFoundException(`Detail service ${id} not found`);
      }
      await this.detailServiceRepository.remove(detailService);
      return new ApiResponse(
        true,
        null,
        `Delete detail ${id} service successfully`,
        200,
      );
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }
}
