import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDetailPriceRoomDto } from './dto/create-detail-price-room.dto';
import { UpdateDetailPriceRoomDto } from './dto/update-detail-price-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetailPriceRoom } from 'src/model';
import { Repository } from 'typeorm';
import { DetailPriceRoomResponse } from './entities/detail-price-room.entity';
import { Response } from 'src/common/response';

@Injectable()
export class DetailPriceRoomService {
  constructor(
    @InjectRepository(DetailPriceRoom)
    private detailPriceRoomRepository: Repository<DetailPriceRoom>,
  ) {}
  async create(createDetailPriceRoomDto: CreateDetailPriceRoomDto): Promise<DetailPriceRoomResponse> {
    try {
      const result = await this.detailPriceRoomRepository.save(createDetailPriceRoomDto);
      return new DetailPriceRoomResponse(result);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<DetailPriceRoomResponse[]> {
    try {
      const result = await this.detailPriceRoomRepository.find();
      return result.map((item) => new DetailPriceRoomResponse(item));
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: string): Promise<DetailPriceRoomResponse> {
    try {
      const result = await this.detailPriceRoomRepository.findOne({ where: { id } });
      if (!result) {
        throw new NotFoundException('Detail price room not found');
      }
      return new DetailPriceRoomResponse(result);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, updateDetailPriceRoomDto: UpdateDetailPriceRoomDto): Promise<Response> {
    try {
      await this.detailPriceRoomRepository.update(id, updateDetailPriceRoomDto);
      return new Response(`Update detail ${id} price room successfully`, 200);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: string): Promise<Response> {
    try {
      await this.detailPriceRoomRepository.delete(id);
      return new Response(`Delete detail ${id} price room successfully`, 200);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
