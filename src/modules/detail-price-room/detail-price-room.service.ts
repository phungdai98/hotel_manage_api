import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateDetailPriceRoomDto } from './dto/create-detail-price-room.dto';
import { UpdateDetailPriceRoomDto } from './dto/update-detail-price-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetailPriceRoom } from 'src/model';
import { Repository } from 'typeorm';
import { DetailPriceRoomResponse } from './entities/detail-price-room.entity';
import { ApiResponse } from 'src/common/entities/typeResponse';

@Injectable()
export class DetailPriceRoomService {
  constructor(
    @InjectRepository(DetailPriceRoom)
    private detailPriceRoomRepository: Repository<DetailPriceRoom>,
  ) {}
  async create(
    createDetailPriceRoomDto: CreateDetailPriceRoomDto,
  ): Promise<ApiResponse<null>> {
    try {
      await this.detailPriceRoomRepository.save(createDetailPriceRoomDto);
      return new ApiResponse(
        true,
        null,
        'Detail price room created successfully',
        201,
      );
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async findAll(): Promise<DetailPriceRoomResponse[]> {
    try {
      const result = await this.detailPriceRoomRepository.find();
      return result.map((item) => new DetailPriceRoomResponse(item));
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async findOne(id: string): Promise<DetailPriceRoomResponse> {
    try {
      const result = await this.detailPriceRoomRepository.findOne({
        where: { id },
      });
      if (!result) {
        throw new NotFoundException('Detail price room not found');
      }
      return new DetailPriceRoomResponse(result);
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async update(
    id: string,
    updateDetailPriceRoomDto: UpdateDetailPriceRoomDto,
  ): Promise<ApiResponse<null>> {
    try {
      await this.detailPriceRoomRepository.update(id, updateDetailPriceRoomDto);
      return new ApiResponse(
        true,
        null,
        `Update detail ${id} price room successfully`,
        200,
      );
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async remove(id: string): Promise<ApiResponse<null>> {
    try {
      await this.detailPriceRoomRepository.delete(id);
      return new ApiResponse(
        true,
        null,
        `Delete detail ${id} price room successfully`,
        200,
      );
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }
}
