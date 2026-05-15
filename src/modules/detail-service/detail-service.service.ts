import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponse } from 'src/common/entities/typeResponse';
import { DetailService } from 'src/model';
import { Repository } from 'typeorm';
import { DetailStatusService } from '../detail-status/detail-status.service';
import { ServiceHotelService } from '../service-hotel/service-hotel.service';
import { CreateDetailServiceDto } from './dto/create-detail-service.dto';
import { UpdateDetailServiceDto } from './dto/update-detail-service.dto';
import { DetailServiceResponse } from './entities/detail-service.entity';

@Injectable()
export class DetailServiceService {
  constructor(
    @InjectRepository(DetailService)
    private readonly _detailServiceRepository: Repository<DetailService>,
    private readonly _serviceHotelService: ServiceHotelService,
    private readonly _detailStatusService: DetailStatusService,
  ) {}

  async create(
    createDetailServiceDto: CreateDetailServiceDto,
  ): Promise<ApiResponse<null>> {
    const [serviceHotel, rentTicket] = await Promise.all([
      this._serviceHotelService.findOne(createDetailServiceDto.serviceCode),
      this._detailStatusService.findRentTicketIdByRoomName(
        createDetailServiceDto.roomName,
      ),
    ]);
    try {
      const detailService = this._detailServiceRepository.create({
        decription: `Service for ${rentTicket.roomId}-${rentTicket.rentTicketId}`,
        amount: createDetailServiceDto.amount,
        price: serviceHotel.price,
        isPayed: false,
        serviceId: serviceHotel.id,
        rentId: rentTicket.rentId,
      });
      await this._detailServiceRepository.save(detailService);
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
      const detailServices = await this._detailServiceRepository.find();
      return detailServices.map(
        (detailService) => new DetailServiceResponse(detailService),
      );
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async findOne(id: string): Promise<DetailServiceResponse> {
    try {
      const detailService = await this._detailServiceRepository.findOne({
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
      const detailService = await this._detailServiceRepository.findOne({
        where: { id },
      });
      if (!detailService) {
        throw new NotFoundException(`Detail service ${id} not found`);
      }
      this._detailServiceRepository.merge(
        detailService,
        updateDetailServiceDto,
      );
      await this._detailServiceRepository.save(detailService);
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
      const detailService = await this._detailServiceRepository.findOne({
        where: { id },
      });
      if (!detailService) {
        throw new NotFoundException(`Detail service ${id} not found`);
      }
      await this._detailServiceRepository.remove(detailService);
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
