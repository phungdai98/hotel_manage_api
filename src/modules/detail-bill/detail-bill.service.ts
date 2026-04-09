import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDetailBillDto } from './dto/create-detail-bill.dto';
import { UpdateDetailBillDto } from './dto/update-detail-bill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetailBill } from 'src/model';
import { Repository } from 'typeorm';
import { Response } from 'src/common/response';
import { DetailBillResponse } from './entities/detail-bill.entity';

@Injectable()
export class DetailBillService {
  constructor(
    @InjectRepository(DetailBill)
    private detailBillRepository: Repository<DetailBill>,
  ) {}
  async create(createDetailBillDto: CreateDetailBillDto): Promise<Response> {
    try {
      await this.detailBillRepository.save(createDetailBillDto);
      return new Response('Detail bill created successfully', 201);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<DetailBillResponse[]> {
    try {
      const result = await this.detailBillRepository.find();
      return result.map((detailBill) => new DetailBillResponse(detailBill));
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: string): Promise<DetailBillResponse> {
    try {
      const result = await this.detailBillRepository.findOne({ where: { id: id } });
      if (!result) {
        throw new NotFoundException('Detail bill not found');
      }
      return new DetailBillResponse(result);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, updateDetailBillDto: UpdateDetailBillDto): Promise<Response> {
    try {
      const result = await this.detailBillRepository.update(id, updateDetailBillDto);
      if (!result) {
        throw new NotFoundException('Detail bill not found');
      }
      return new Response('Detail bill updated successfully', 200);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: string): Promise<string> {
    try {
      const result = await this.detailBillRepository.delete(id);
      if (!result) {
        throw new NotFoundException('Detail bill not found');
      }
      return id;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
