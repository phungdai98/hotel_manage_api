import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponse } from 'src/common/entities/typeResponse';
import { DetailStatus, OrderTicket, Rent, RentTicket } from 'src/model';
import { DataSource, Repository } from 'typeorm';
import { CreateRentTicketDto } from './dto/create-rent-ticket.dto';
import { UpdateRentTicketDto } from './dto/update-rent-ticket.dto';
import { RentTicketResponse } from './entities/rent-ticket.entity';
import { StatusRoomEnum } from '../../common/enums/statusRoomEnum';

@Injectable()
export class RentTicketService {
  constructor(
    @InjectRepository(RentTicket)
    private rentTicketRepository: Repository<RentTicket>,
    private readonly dataSource: DataSource,
  ) {}

  async create(
    createRentTicketDto: CreateRentTicketDto,
  ): Promise<ApiResponse<RentTicketResponse>> {
    const queryRuner = this.dataSource.createQueryRunner();
    await queryRuner.connect();
    await queryRuner.startTransaction();
    try {
      const order = await queryRuner.manager.findOne(OrderTicket, {
        where: { id: createRentTicketDto.orderTicketId },
      });
      if (!order) {
        throw new NotFoundException('Order Not Found');
      }
      const { rents, ...rentTicketData } = createRentTicketDto;
      const rentTicket = queryRuner.manager.create(RentTicket, {
        ...rentTicketData,
      });
      const savedRentTicket = await queryRuner.manager.save(rentTicket);
      if (rents && rents.length > 0) {
        const rentEntities = rents.map((rent) => {
          return queryRuner.manager.create(Rent, {
            ...rent,
            rentTicketId: savedRentTicket.id,
          });
        });
        await queryRuner.manager.save(rentEntities);
        const statusRoom = rents.map((rent) => {
          return queryRuner.manager.create(DetailStatus, {
            roomId: rent.roomId,
            dateStart: savedRentTicket.dateStart,
            dateEnd: savedRentTicket.dateEnd,
            status: StatusRoomEnum.OCCUPIED,
          });
        });
        await queryRuner.manager.save(statusRoom);
      }
      return new ApiResponse(
        true,
        new RentTicketResponse(savedRentTicket),
        'Rent ticket created',
        200,
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
