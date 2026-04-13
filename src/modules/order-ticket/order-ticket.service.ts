import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateOrderTicketDto } from './dto/create-order-ticket.dto';
import { UpdateOrderTicketDto } from './dto/update-order-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderTicket } from 'src/model';
import { Repository } from 'typeorm';
import { Response } from 'src/common/response';
import { OrderTicketResponse } from './entities/order-ticket.entity';

@Injectable()
export class OrderTicketService {
  constructor(
    @InjectRepository(OrderTicket)
    private readonly orderTicketRepository: Repository<OrderTicket>,
  ) {}

  async create(createOrderTicketDto: CreateOrderTicketDto): Promise<Response> {
    try {
      const orderTicket =
        this.orderTicketRepository.create(createOrderTicketDto);
      await this.orderTicketRepository.save(orderTicket);
      return new Response('Order ticket created successfully', 200);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<OrderTicketResponse[]> {
    try {
      const result = await this.orderTicketRepository.find();
      return result.map((rs) => new OrderTicketResponse(rs));
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: string): Promise<OrderTicketResponse | null> {
    try {
      const result = await this.orderTicketRepository.findOne({
        where: { id: id },
      });
      return result ? new OrderTicketResponse(result) : null;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, data: UpdateOrderTicketDto): Promise<Response> {
    try {
      const result = await this.orderTicketRepository.findOne({where: {id: id}})
      if(!result) {
        throw new NotFoundException(`Order ticket with ID ${id} not found`);
      }
      await this.orderTicketRepository.update(id, data);
      return new Response('Order ticket updated successfully', 200);
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async remove(id: string): Promise<Response> {
    try {
      const result = await this.orderTicketRepository.findOne({where: {id: id}})
      if(!result) {
        throw new NotFoundException(`Order ticket with ID ${id} not found`);
      }
      await this.orderTicketRepository.remove(result);
      return new Response('Order ticket deleted successfully', 200);
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
