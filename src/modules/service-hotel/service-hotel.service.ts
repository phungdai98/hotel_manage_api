import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponse } from 'src/common/entities/typeResponse';
import { Service } from 'src/model';
import { Repository } from 'typeorm';
import { CreateServiceHotelDto } from './dto/create-service-hotel.dto';
import { UpdateServiceHotelDto } from './dto/update-service-hotel.dto';
import { IServiceHotelResponse, ServiceHotelResponse } from './entities/service-hotel.entity';

@Injectable()
export class ServiceHotelService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}
  async create(
    createServiceHotelDto: CreateServiceHotelDto,
  ): Promise<ApiResponse<null>> {
    try {
      const service = this.serviceRepository.create(createServiceHotelDto);
      await this.serviceRepository.save(service);
      return new ApiResponse(true, null, 'Service created successfully', 201);
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async findAll(): Promise<ServiceHotelResponse[]> {
    try {
      const services = await this.serviceRepository
        .createQueryBuilder('service')
        .distinctOn(['service.id'])
        .select([
          'service.id AS id',
          'service.code AS code',
          'service.name AS name',
          'detailPriceServices.price AS price',
        ])
        .innerJoin(
          'service.detailPriceServices',
          'detailPriceServices'
        )
        .where('detailPriceServices.activeDate <= :activeDate', {
          activeDate: new Date().toISOString().split('T')[0],
        })
        .orderBy('service.id', 'ASC')
        .addOrderBy('detailPriceServices.activeDate', 'DESC')
        .getRawMany();
      return services.map((service) => new ServiceHotelResponse(service));
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async findOne(code: string): Promise<ServiceHotelResponse> {
    try {
      const service = await this.serviceRepository
        .createQueryBuilder('service')
        .select([
          'service.id AS id',
          'service.code AS code',
          'service.name AS name',
          'detailPriceServices.price AS price',
        ])
        .innerJoin(
          'service.detailPriceServices',
          'detailPriceServices'
        )
        .where('detailPriceServices.activeDate <= :activeDate', {
          activeDate: new Date().toISOString().split('T')[0],
        })
        .andWhere('service.code = :code', { code })
        .addOrderBy('detailPriceServices.activeDate', 'DESC')
        .limit(1)
        .getRawOne<IServiceHotelResponse>();
      if (!service) {
        throw new NotFoundException('Service not found');
      }
      return new ServiceHotelResponse(service);
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async update(
    id: string,
    updateServiceHotelDto: UpdateServiceHotelDto,
  ): Promise<ApiResponse<null>> {
    try {
      const service = await this.serviceRepository.findOne({ where: { id } });
      if (!service) {
        throw new NotFoundException('Service not found');
      }
      await this.serviceRepository.update(id, updateServiceHotelDto);
      return new ApiResponse(true, null, 'Service updated successfully', 200);
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async remove(id: string): Promise<ApiResponse<null>> {
    try {
      const service = await this.serviceRepository.findOne({ where: { id } });
      if (!service) {
        throw new NotFoundException('Service not found');
      }
      await this.serviceRepository.remove(service);
      return new ApiResponse(true, null, 'Service deleted successfully', 200);
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }
}
