import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateDetailCustomerAtDto } from './dto/create-detail-customer-at.dto';
import { UpdateDetailCustomerAtDto } from './dto/update-detail-customer-at.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetailCustomerAt } from 'src/model';
import { Repository } from 'typeorm';
import { DetailCustomerAtResponse } from './entities/detail-customer-at.entity';
import { ApiResponse } from 'src/common/entities/typeResponse';

@Injectable()
export class DetailCustomerAtService {
  constructor(
    @InjectRepository(DetailCustomerAt)
    private detailCustomerAtRepository: Repository<DetailCustomerAt>,
  ) {}

  async create(
    createDetailCustomerAtDto: CreateDetailCustomerAtDto,
  ): Promise<ApiResponse<null>> {
    try {
      await this.detailCustomerAtRepository.save(createDetailCustomerAtDto);
      return new ApiResponse(
        true,
        null,
        'Create detail customer at successfully',
        200,
      );
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async findAll(): Promise<DetailCustomerAtResponse[]> {
    try {
      const result = await this.detailCustomerAtRepository.find();
      return result.map((item) => new DetailCustomerAtResponse(item));
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async findOne(id: string): Promise<DetailCustomerAtResponse> {
    try {
      const result = await this.detailCustomerAtRepository.findOne({
        where: { id },
      });
      if (!result) {
        throw new NotFoundException('Detail customer at not found');
      }
      return new DetailCustomerAtResponse(result);
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async update(
    id: string,
    updateDetailCustomerAtDto: UpdateDetailCustomerAtDto,
  ): Promise<ApiResponse<null>> {
    try {
      await this.detailCustomerAtRepository.update(
        id,
        updateDetailCustomerAtDto,
      );
      return new ApiResponse(
        true,
        null,
        `Update detail ${id} customer at successfully`,
        200,
      );
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async remove(id: string): Promise<ApiResponse<null>> {
    try {
      await this.detailCustomerAtRepository.delete(id);
      return new ApiResponse(
        true,
        null,
        `Delete detail ${id} customer at successfully`,
        200,
      );
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }
}
