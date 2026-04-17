import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderTicket, DetailOrderTicket, Customer } from 'src/model';
import { DataSource, Repository } from 'typeorm';
import { OrderDto } from './dto/order.dto';
import { ApiResponse } from 'src/common/entities/typeResponse';
import { OrderTicketResponse } from '../order-ticket/entities/order-ticket.entity';
import { OrderTicketStatusEnum } from 'src/common/enums/orderTicketStatus.enum';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderTicket)
    private readonly orderTicketRepository: Repository<OrderTicket>,
    private readonly dataSource: DataSource,
  ) {}

  async create(orderDto: OrderDto): Promise<ApiResponse<OrderTicketResponse>> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { details, customer, ...orderData } = orderDto;
      const customerExist = await queryRunner.manager.findOne(Customer, {where: {phone: customer.phone}});
      let customerId = '';
      if(!customerExist) {
        const newCustomer = queryRunner.manager.create(Customer, customer);
        const savedCustomer = await queryRunner.manager.save(newCustomer);
        customerId = savedCustomer.id;
      } else {
        customerId = customerExist.id;
      }
      
      const orderTicket = queryRunner.manager.create(OrderTicket, {...orderData, status: OrderTicketStatusEnum.PENDING, customerId: customerId});
      const savedOrder = await queryRunner.manager.save(orderTicket);
      
      if (details && details.length > 0) {
        const detailEntities = details.map(detail => {
          return queryRunner.manager.create(DetailOrderTicket, {
            ...detail,
            orderTicketId: savedOrder.id
          });
        });
        await queryRunner.manager.save(detailEntities);
      }
      
      await queryRunner.commitTransaction();
      
      // Reload order with details for the response
      const result = await this.orderTicketRepository.findOne({
          where: { id: savedOrder.id },
          relations: ['detailOrderTickets']
      });

      return new ApiResponse(true, new OrderTicketResponse(result!), 'Order created successfully', 200);
    } catch (error: any) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error.message);
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<OrderTicketResponse[]> {
    try {
      const result = await this.orderTicketRepository.find({
        relations: ['detailOrderTickets']
      });
      return result.map((rs) => new OrderTicketResponse(rs));
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: string): Promise<OrderTicketResponse> {
    try {
      const result = await this.orderTicketRepository.findOne({
        where: { id: id },
        relations: ['detailOrderTickets']
      });
      if (!result) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }
      return new OrderTicketResponse(result);
    } catch (error: any) {
        if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(error.message);
    }
  }
}
