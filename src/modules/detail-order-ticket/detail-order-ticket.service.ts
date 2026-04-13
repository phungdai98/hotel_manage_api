import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDetailOrderTicketDto } from './dto/create-detail-order-ticket.dto';
import { UpdateDetailOrderTicketDto } from './dto/update-detail-order-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetailOrderTicket } from 'src/model';
import { Repository } from 'typeorm';
import { Response } from 'src/common/response';
import { DetailOrderTicketResponse } from './entities/detail-order-ticket.entity';

@Injectable()
export class DetailOrderTicketService {
  constructor(
    @InjectRepository(DetailOrderTicket)
    private detailOrderTicketRepository: Repository<DetailOrderTicket>,
  ) {}

  async create(createDetailOrderTicketDto: CreateDetailOrderTicketDto): Promise<Response> {
    try {
      await this.detailOrderTicketRepository.save(createDetailOrderTicketDto);
      return new Response('Create detail order ticket successfully', 200);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<DetailOrderTicketResponse[]> {
    try {
      const result = await this.detailOrderTicketRepository.find();
      return result.map((item) => new DetailOrderTicketResponse(item));
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: string): Promise<DetailOrderTicketResponse> {
    try {
      const result = await this.detailOrderTicketRepository.findOne({ where: { id } });
      if (!result) {
        throw new NotFoundException('Detail order ticket not found');
      }
      return new DetailOrderTicketResponse(result);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, updateDetailOrderTicketDto: UpdateDetailOrderTicketDto): Promise<Response> {
    try {
      await this.detailOrderTicketRepository.update(id, updateDetailOrderTicketDto);
      return new Response(`Update detail ${id} order ticket successfully`, 200);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: string): Promise<Response> {
    try {
      await this.detailOrderTicketRepository.delete(id);
      return new Response(`Delete detail ${id} order ticket successfully`, 200);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
