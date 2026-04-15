import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateOrderTicketDto } from './dto/create-order-ticket.dto';
import { UpdateOrderTicketDto } from './dto/update-order-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderTicket } from 'src/model';
import { Repository } from 'typeorm';
import { OrderTicketResponse } from './entities/order-ticket.entity';
import { ApiResponse } from 'src/common/entities/typeResponse';
import { ErrorResponseWithStatusCode } from 'src/common/entities/errorEntity';

@Injectable()
export class OrderTicketService {
  constructor(
    @InjectRepository(OrderTicket)
    private readonly orderTicketRepository: Repository<OrderTicket>,
  ) {}

  async create(createOrderTicketDto: CreateOrderTicketDto): Promise<ApiResponse<null>> {
    try {
      const orderTicket =
        this.orderTicketRepository.create(createOrderTicketDto);
      await this.orderTicketRepository.save(orderTicket);
      return new ApiResponse(true, null, 'Order ticket created successfully', 200);
    } catch (error: ErrorResponseWithStatusCode) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<OrderTicketResponse[]> {
    try {
      const result = await this.orderTicketRepository.find();
      return result.map((rs) => new OrderTicketResponse(rs));
    } catch (error: ErrorResponseWithStatusCode) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: string): Promise<OrderTicketResponse> {
    try {
      const result = await this.orderTicketRepository.findOne({
        where: { id: id },
      });
      if (!result) {
        throw new NotFoundException(`Order ticket with ID ${id} not found`);
      }
      return new OrderTicketResponse(result);
    } catch (error: ErrorResponseWithStatusCode) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, data: UpdateOrderTicketDto): Promise<ApiResponse<null>> {
    try {
      const result = await this.orderTicketRepository.findOne({where: {id: id}})
      if(!result) {
        throw new NotFoundException(`Order ticket with ID ${id} not found`);
      }
      await this.orderTicketRepository.update(id, data);
      return new ApiResponse(true, null, 'Order ticket updated successfully', 200);
    } catch (error: ErrorResponseWithStatusCode) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async remove(id: string): Promise<ApiResponse<null>> {
    try {
      const result = await this.orderTicketRepository.findOne({where: {id: id}})
      if(!result) {
        throw new NotFoundException(`Order ticket with ID ${id} not found`);
      }
      await this.orderTicketRepository.remove(result);
      return new ApiResponse(true, null, 'Order ticket deleted successfully', 200);
    } catch (error: ErrorResponseWithStatusCode) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
