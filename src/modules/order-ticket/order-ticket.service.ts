import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderTicketDto } from './dto/create-order-ticket.dto';
import { UpdateOrderTicketDto } from './dto/update-order-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderTicket, DetailOrderTicket } from 'src/model';
import { DataSource, FindOptionsWhere, Like, Repository } from 'typeorm';
import { OrderTicketResponse } from './entities/order-ticket.entity';
import { ApiResponse } from 'src/common/entities/typeResponse';
import { ReqFindAllOrderTicketDto } from './dto/req-order-ticket.dto';

@Injectable()
export class OrderTicketService {
  constructor(
    @InjectRepository(OrderTicket)
    private readonly orderTicketRepository: Repository<OrderTicket>,
    private readonly dataSource: DataSource,
  ) {}

  async create(
    createOrderTicketDto: CreateOrderTicketDto,
  ): Promise<ApiResponse<OrderTicketResponse>> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { details, ...orderData } = createOrderTicketDto;

      const orderTicket = queryRunner.manager.create(OrderTicket, orderData);
      const savedOrder = await queryRunner.manager.save(orderTicket);

      const detailEntities = details.map((detail) => {
        return queryRunner.manager.create(DetailOrderTicket, {
          ...detail,
          orderTicketId: savedOrder.id,
        });
      });
      await queryRunner.manager.save(detailEntities);

      await queryRunner.commitTransaction();

      // Reload order with details for the response
      const result = await this.orderTicketRepository.findOne({
        where: { id: savedOrder.id },
        relations: ['detailOrderTickets'],
      });

      return new ApiResponse(
        true,
        new OrderTicketResponse(result!),
        'Order ticket created successfully',
        200,
      );
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException((error as Error).message);
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(req: ReqFindAllOrderTicketDto): Promise<OrderTicketResponse[]> {
    try {
      const query = this.orderTicketRepository
        .createQueryBuilder('orderTicket')
        .leftJoinAndSelect(
          'orderTicket.detailOrderTickets',
          'detailOrderTicket',
        )
        .leftJoinAndSelect('orderTicket.customer', 'customer')
        .take(req.limit)
        .skip((req.page - 1) * req.limit)
        .orderBy('orderTicket.code', 'DESC');

      if (req.search) {
        if (!isNaN(Number(req.search))) {
          query.andWhere('orderTicket.code = :code', {
            code: Number(req.search),
          });
        } else {
          query.andWhere('customer.name LIKE :name', {
            name: `%${req.search}%`,
          });
        }
      }
      if (req.startDate) {
        query.andWhere('orderTicket.dateStart >= :dateStart', {
          dateStart: req.startDate,
        });
      }
      if (req.endDate) {
        query.andWhere('orderTicket.dateEnd <= :dateEnd', {
          dateEnd: req.endDate,
        });
      }
      if (req.status) {
        query.andWhere('orderTicket.status = :status', { status: req.status });
      }
      const result = await query.getMany();
      return result.map((rs) => new OrderTicketResponse(rs));
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async findOne(id: string): Promise<OrderTicketResponse> {
    try {
      const result = await this.orderTicketRepository.findOne({
        where: { id: id },
        relations: ['detailOrderTickets'],
      });

      if (!result) {
        throw new NotFoundException(`Order ticket with ID ${id} not found`);
      }
      return new OrderTicketResponse(result);
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async update(
    id: string,
    data: UpdateOrderTicketDto,
  ): Promise<ApiResponse<null>> {
    try {
      const result = await this.orderTicketRepository.findOne({
        where: { id: id },
      });
      if (!result) {
        throw new NotFoundException(`Order ticket with ID ${id} not found`);
      }
      await this.orderTicketRepository.update(id, data);
      return new ApiResponse(
        true,
        null,
        'Order ticket updated successfully',
        200,
      );
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async updateStatus(id: string, status: string): Promise<ApiResponse<null>> {
    try {
      const result = await this.orderTicketRepository.findOne({
        where: { id: id },
      });
      if (!result) {
        throw new NotFoundException(`Order ticket with ID ${id} not found`);
      }
      await this.orderTicketRepository.update(id, { status: status });
      return new ApiResponse(
        true,
        null,
        'Order ticket updated successfully',
        200,
      );
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async remove(id: string): Promise<ApiResponse<null>> {
    try {
      const result = await this.orderTicketRepository.findOne({
        where: { id: id },
      });
      if (!result) {
        throw new NotFoundException(`Order ticket with ID ${id} not found`);
      }
      await this.orderTicketRepository.remove(result);
      return new ApiResponse(
        true,
        null,
        'Order ticket deleted successfully',
        200,
      );
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }
}
