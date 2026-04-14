import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateServiceHotelDto } from './dto/create-service-hotel.dto';
import { UpdateServiceHotelDto } from './dto/update-service-hotel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from 'src/model';
import { Repository } from 'typeorm';
import { Response } from 'src/common/response';
import { ServiceHotelResponse } from './entities/service-hotel.entity';

@Injectable()
export class ServiceHotelService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}
  async create(createServiceHotelDto: CreateServiceHotelDto): Promise<Response> {
    try {
      const service = this.serviceRepository.create(createServiceHotelDto);
      await this.serviceRepository.save(service);
      return new Response('Service created successfully', 201);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<ServiceHotelResponse[]> {
    try {
      const services = await this.serviceRepository.find();
      return services.map((service) => new ServiceHotelResponse(service));
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: string): Promise<ServiceHotelResponse> {
    try {
      const service = await this.serviceRepository.findOne({ where: { id } });
      if (!service) {
        throw new NotFoundException('Service not found');
      }
      return new ServiceHotelResponse(service);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, updateServiceHotelDto: UpdateServiceHotelDto): Promise<Response> {
    try {
      const service = await this.serviceRepository.findOne({ where: { id } });
      if (!service) {
        throw new NotFoundException('Service not found');
      }
      await this.serviceRepository.update(id, updateServiceHotelDto);
      return new Response('Service updated successfully', 200);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: string): Promise<Response> {
    try {
      const service = await this.serviceRepository.findOne({ where: { id } });
      if (!service) {
        throw new NotFoundException('Service not found');
      }
      await this.serviceRepository.remove(service);
      return new Response('Service deleted successfully', 200);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
