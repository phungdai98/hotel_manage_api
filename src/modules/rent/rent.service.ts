import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponse } from 'src/common/entities/typeResponse';
import { Rent } from 'src/model';
import { Repository } from 'typeorm';
import { CreateRentDto } from './dto/create-rent.dto';
import { UpdateRentDto } from './dto/update-rent.dto';
import { RentResponse } from './entities/rent.entity';

@Injectable()
export class RentService {
  constructor(
    @InjectRepository(Rent)
    private rentRepository: Repository<Rent>,
  ) {}
  async create(createRentDto: CreateRentDto): Promise<ApiResponse<null>> {
    try {
      const rent = this.rentRepository.create(createRentDto);
      await this.rentRepository.save(rent);
      return new ApiResponse(true, null, 'Rent created successfully', 201);
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async findAll(): Promise<RentResponse[]> {
    try {
      const rents = await this.rentRepository.find();
      return rents.map((rent) => new RentResponse(rent));
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async findOne(id: string): Promise<RentResponse> {
    try {
      const rent = await this.rentRepository.findOne({ where: { id } });
      if (!rent) {
        throw new NotFoundException('Rent not found');
      }
      return new RentResponse(rent);
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async update(
    id: string,
    updateRentDto: UpdateRentDto,
  ): Promise<ApiResponse<null>> {
    try {
      const rent = await this.rentRepository.findOne({ where: { id } });
      if (!rent) {
        throw new NotFoundException('Rent not found');
      }
      await this.rentRepository.update(id, updateRentDto);
      return new ApiResponse(true, null, 'Rent updated successfully', 200);
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async remove(id: string): Promise<ApiResponse<null>> {
    try {
      const rent = await this.rentRepository.findOne({ where: { id } });
      if (!rent) {
        throw new NotFoundException('Rent not found');
      }
      await this.rentRepository.remove(rent);
      return new ApiResponse(true, null, 'Rent deleted successfully', 200);
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }
}
