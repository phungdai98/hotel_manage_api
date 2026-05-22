import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponse } from 'src/common/entities/typeResponse';
import { DetailService, Rent, RentTicket } from 'src/model';
import { In, Repository } from 'typeorm';
import { CalculateRentPriceDto, CalculateRentsPriceDto, CreateRentDto, GetPriceByCodeRentTicketDto } from './dto/create-rent.dto';
import { UpdateRentDto } from './dto/update-rent.dto';
import { RentCalculatePriceResponse, RentResponse } from './entities/rent.entity';
import { RentTicketResponse } from '../rent-ticket/entities/rent-ticket.entity';
import dayjs from 'dayjs';

@Injectable()
export class RentService {
  constructor(
    @InjectRepository(Rent)
    private rentRepository: Repository<Rent>,
    @InjectRepository(DetailService)
    private detailServiceRepository: Repository<DetailService>,
    @InjectRepository(RentTicket)
    private rentTicketRepository: Repository<RentTicket>,
  ) { }
  async create(createRentDto: CreateRentDto): Promise<ApiResponse<null>> {
    try {
      const rent = this.rentRepository.create(createRentDto);
      await this.rentRepository.save(rent);
      return new ApiResponse(true, null, 'Rent created successfully', 201);
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async findAll(): Promise<RentResponse[]> {
    try {
      const rents = await this.rentRepository.find();
      return rents.map((rent) => new RentResponse(rent));
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async findOne(id: string): Promise<RentResponse> {
    try {
      const rent = await this.rentRepository.findOne({ where: { id } });
      if (!rent) {
        throw new NotFoundException('Rent not found');
      }
      return new RentResponse(rent);
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async update(
    id: string,
    updateRentDto: UpdateRentDto,
  ): Promise<ApiResponse<null>> {
    try {
      const rent = await this.rentRepository.findOne({ where: { id } });
      if (!rent) {
        throw new NotFoundException('Rent not found');
      }
      await this.rentRepository.update(id, updateRentDto);
      return new ApiResponse(true, null, 'Rent updated successfully', 200);
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async remove(id: string): Promise<ApiResponse<null>> {
    try {
      const rent = await this.rentRepository.findOne({ where: { id } });
      if (!rent) {
        throw new NotFoundException('Rent not found');
      }
      await this.rentRepository.remove(rent);
      return new ApiResponse(true, null, 'Rent deleted successfully', 200);
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async findIdRentFromRentTicketId(rentTicketId: string, roomId: string, isPayed?: boolean): Promise<RentResponse> {
    try {
      let where: { rentTicketId: string, roomId: string, isPayed?: boolean } = { rentTicketId, roomId };
      if (isPayed !== undefined) {
        where.isPayed = isPayed;
      }
      const rent = await this.rentRepository.findOne({ where });
      if (!rent) {
        throw new NotFoundException('Rent not found');
      }
      return new RentResponse(rent);
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  private async calculateRentPrice(request: CalculateRentsPriceDto): Promise<RentCalculatePriceResponse[]> {
    try {
      const rents = await this.rentRepository.find({ where: request.rents.map(r => ({ rentTicketId: r.rentTicketId, roomId: r.roomId })), relations: { room: true } });
      if (!rents || !rents.length) {
        throw new NotFoundException('Rent not found');
      }
      const allServices: DetailService[] = await this.detailServiceRepository.findBy({ rentId: In(rents.map(item => item.id)) });

      const serviceMap = new Map<string, DetailService[]>();

      allServices.forEach(service => {
        if (!serviceMap.has(service.rentId)) {
          serviceMap.set(service.rentId, []);
        }
        serviceMap.get(service.rentId)!.push(service);
      });

      const results: RentCalculatePriceResponse[] = rents.map((rent) => {
        const quantityDate = dayjs(request.checkOut).diff(dayjs(request.checkIn), 'day');
        const totalPriceRoom = rent.currentPriceRoom * quantityDate + rent.surcharge;
        const detailService = serviceMap.get(rent.id) || [];
        const totalPriceService = detailService.reduce((acc, service) => acc + service.price * service.amount, 0);
        return new RentCalculatePriceResponse({ ...rent, totalPriceRoom, totalPriceService, quantityDate });
      })
      return results
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async getPriceByCodeRentTicket(request: GetPriceByCodeRentTicketDto): Promise<RentCalculatePriceResponse[]> {
    try {
      const rentTicket: RentTicket | null = await this.rentTicketRepository.findOne({ where: { code: request.codeRentTicket } });
      if (!rentTicket) {
        throw new NotFoundException('Rent not found');
      }
      const rents: Rent[] = await this.rentRepository.find({ where: { rentTicketId: rentTicket.id } });
      const requestCalc: CalculateRentsPriceDto = {
        checkIn: request.checkIn,
        checkOut: request.checkOut,
        rents: rents.map(rent => ({ rentTicketId: rent.rentTicketId, roomId: rent.roomId }))
      }
      return await this.calculateRentPrice(requestCalc);
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }
}
