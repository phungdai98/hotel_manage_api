import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { PartResponse } from './entities/part.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Part } from 'src/model';
import { Repository } from 'typeorm';
import { ApiResponse } from 'src/common/entities/typeResponse';
import { ErrorResponseWithStatusCode } from 'src/common/entities/errorEntity';

@Injectable()
export class PartService {
  constructor(@InjectRepository(Part) private partRepository: Repository<Part>) {}

  async create(createPartDto: CreatePartDto): Promise<ApiResponse<null>> {
    try {
      const part = this.partRepository.create(createPartDto);
      await this.partRepository.save(part);
      return new ApiResponse(true, null, 'Part created successfully', 200);
    } catch (error: ErrorResponseWithStatusCode) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<PartResponse[]> {
    try {
      const parts = await this.partRepository.find();
      return parts.map((part) => new PartResponse(part));
    } catch (error: ErrorResponseWithStatusCode) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: string): Promise<PartResponse> {
    try {
      const part = await this.partRepository.findOneBy({ id });
      if (!part) {
        throw new BadRequestException(`Part (ID: ${id}) not found!`);
      }
      return new PartResponse(part);
    } catch (error: ErrorResponseWithStatusCode) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, updatePartDto: UpdatePartDto): Promise<ApiResponse<null>> {
    try {
      await this.partRepository.update({ id }, updatePartDto);
      return new ApiResponse(true, null, 'Part updated successfully', 200);
    } catch (error: ErrorResponseWithStatusCode) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: string): Promise<ApiResponse<null>> {
    try {
      const part = await this.partRepository.findOneBy({ id });
      if (!part) {
        throw new BadRequestException(`Part (ID: ${id}) not found!`);
      }
      await this.partRepository.delete({ id });
      return new ApiResponse(true, null, 'Part deleted successfully', 200);
    } catch (error: ErrorResponseWithStatusCode) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
