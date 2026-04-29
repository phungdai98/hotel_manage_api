import {
  HttpException,
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
    userId: string,
  ): Promise<ApiResponse<RentTicketResponse>> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const order = await queryRunner.manager.findOne(OrderTicket, {
        where: { id: createRentTicketDto.orderTicketId },
      });
      if (!order) {
        throw new NotFoundException('Order Not Found');
      }
      const { rents, ...rentTicketData } = createRentTicketDto;
      const rentTicket = queryRunner.manager.create(RentTicket, {
        ...rentTicketData,
        userId: userId,
        dateStart: rentTicketData.checkInDate,
        dateEnd: rentTicketData.checkOutDate,
      });
      const savedRentTicket = await queryRunner.manager.save(rentTicket);
      if (rents && rents.length > 0) {
        const rentEntities = rents.map((rent) => {
          return queryRunner.manager.create(Rent, {
            ...rent,
            rentTicketId: savedRentTicket.id,
          });
        });
        await queryRunner.manager.save(rentEntities);
        const statusRoom = rents.map((rent) => {
          return queryRunner.manager.create(DetailStatus, {
            roomId: rent.roomId,
            dateStart: savedRentTicket.dateStart,
            dateEnd: savedRentTicket.dateEnd,
            status: StatusRoomEnum.OCCUPIED,
            rentTicketId: savedRentTicket.id,
          });
        });
        await queryRunner.manager.save(statusRoom);
      }
      await queryRunner.commitTransaction();
      return new ApiResponse(
        true,
        new RentTicketResponse(savedRentTicket),
        'Rent ticket created',
        200,
      );
    } catch (error) {
      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
      }
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException((error as Error).message);
    } finally {
      await queryRunner.release();
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
