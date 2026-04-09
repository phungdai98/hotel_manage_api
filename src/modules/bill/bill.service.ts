import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bill, RentTicket } from 'src/model';
import { DeleteResult, FindOptionsWhere, Like, Repository } from 'typeorm';
import { BillResponse } from './entities/bill.entity';

@Injectable()
export class BillService {
  constructor(
    @InjectRepository(Bill)
    private billRepository: Repository<Bill>,
    @InjectRepository(RentTicket)
    private rentTicketRepository: Repository<RentTicket>,
  ) {}
  async create(createBillDto: CreateBillDto): Promise<BillResponse> {
    try {
      const checkRentTicket = await this.rentTicketRepository.findOne({ where: { id: createBillDto.rentTicketId } });
      if (!checkRentTicket) {
        throw new NotFoundException('Rent ticket not found');
      }
      const result = await this.billRepository.save(createBillDto);
      return new BillResponse(result);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(page: number, limit: number, search: string): Promise<BillResponse[]> {
    try {
      const where: FindOptionsWhere<Bill> = {};
      if (search) {
        where.decription = Like(`%${search}%`);
      }
      const result = await this.billRepository.find({
        skip: (page - 1) * limit,
        take: limit,
        where: where,
      });
      return result.map((bill) => new BillResponse(bill));
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: string): Promise<BillResponse> {
    try {
      const result = await this.billRepository.findOne({ where: { id: id } });
      if (!result) {
        throw new NotFoundException('Bill not found');
      }
      return new BillResponse(result);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, updateBillDto: UpdateBillDto) {
    try {
      const result = await this.billRepository.update(id, updateBillDto);
      if (!result) {
        throw new NotFoundException('Bill not found');
      }
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: string): Promise<string> {
    try {
      const result = await this.billRepository.delete(id);
      if (!result) {
        throw new NotFoundException('Bill not found');
      }
      return id;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
