import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponse } from 'src/common/entities/typeResponse';
import { RentTicket } from 'src/model';
import { Repository } from 'typeorm';
import { CreateRentTicketDto } from './dto/create-rent-ticket.dto';
import { UpdateRentTicketDto } from './dto/update-rent-ticket.dto';
import { RentTicketResponse } from './entities/rent-ticket.entity';

@Injectable()
export class RentTicketService {
  constructor(
    @InjectRepository(RentTicket)
    private rentTicketRepository: Repository<RentTicket>,
  ) {}

  async create(
    createRentTicketDto: CreateRentTicketDto,
  ): Promise<ApiResponse<null>> {
    try {
      const rentTicket = this.rentTicketRepository.create(createRentTicketDto);
      await this.rentTicketRepository.save(rentTicket);
      return new ApiResponse(
        true,
        null,
        'Rent ticket created successfully',
        201,
      );
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async findAll(): Promise<RentTicketResponse[]> {
    try {
      const rentTickets = await this.rentTicketRepository.find();
      return rentTickets.map(
        (rentTicket) => new RentTicketResponse(rentTicket),
      );
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async findOne(id: string): Promise<RentTicketResponse> {
    try {
      const rentTicket = await this.rentTicketRepository.findOne({
        where: { id },
      });
      if (!rentTicket) {
        throw new NotFoundException('Rent ticket not found');
      }
      return new RentTicketResponse(rentTicket);
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async update(
    id: string,
    updateRentTicketDto: UpdateRentTicketDto,
  ): Promise<ApiResponse<null>> {
    try {
      const rentTicket = await this.rentTicketRepository.findOne({
        where: { id },
      });
      if (!rentTicket) {
        throw new NotFoundException('Rent ticket not found');
      }
      await this.rentTicketRepository.update(id, updateRentTicketDto);
      return new ApiResponse(
        true,
        null,
        'Rent ticket updated successfully',
        200,
      );
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async remove(id: string): Promise<ApiResponse<null>> {
    try {
      const rentTicket = await this.rentTicketRepository.findOne({
        where: { id },
      });
      if (!rentTicket) {
        throw new NotFoundException('Rent ticket not found');
      }
      await this.rentTicketRepository.remove(rentTicket);
      return new ApiResponse(
        true,
        null,
        'Rent ticket deleted successfully',
        200,
      );
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }
}
