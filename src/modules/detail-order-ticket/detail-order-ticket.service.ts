import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDetailOrderTicketDto } from './dto/create-detail-order-ticket.dto';
import { UpdateDetailOrderTicketDto } from './dto/update-detail-order-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetailOrderTicket } from 'src/model';
import { Repository } from 'typeorm';
import { Response } from 'src/common/response';
import { DetailOrderTicketResponse } from './entities/detail-order-ticket.entity';
import { OrderTicketStatusEnum } from 'src/common/enums/orderTicketStatus.enum';

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

  async countBookedQuantityByRankIds(
    dateCheckIn: string,
    dateCheckOut: string,
    rankRoomIds: string[],
  ): Promise<Record<string, number>> {
    try {
      const rows = await this.detailOrderTicketRepository
        .createQueryBuilder('detailOrderTicket')
        .select('detailOrderTicket.rankRoomId', 'rankRoomId')
        .addSelect('SUM(detailOrderTicket.quantity)', 'bookedQuantity')
        .innerJoin('detailOrderTicket.orderTicket', 'orderTicket')
        .where('detailOrderTicket.rankRoomId IN (:...rankRoomIds)', { rankRoomIds })
        .andWhere('orderTicket.dateStart < :dateCheckOut', { dateCheckOut })
        .andWhere('orderTicket.dateEnd > :dateCheckIn', { dateCheckIn })
        .andWhere('orderTicket.status != :cancelled', { cancelled: OrderTicketStatusEnum.CANCELLED })
        .groupBy('detailOrderTicket.rankRoomId')
        .getRawMany<{ rankRoomId: string; bookedQuantity: string }>();

      return rows.reduce((acc, row) => {
        acc[row.rankRoomId] = Number(row.bookedQuantity);
        return acc;
      }, {} as Record<string, number>);
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
