import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { PartResponse } from './entities/part.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Part } from 'src/model';
import { Repository } from 'typeorm';

@Injectable()
export class PartService {
  constructor(@InjectRepository(Part) private partRepository: Repository<Part>) {}

  async create(createPartDto: CreatePartDto): Promise<PartResponse> {
    try {
      const part = this.partRepository.create(createPartDto);
      const savedPart = await this.partRepository.save(part);
      return new PartResponse(savedPart);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<PartResponse[]> {
    try {
      const parts = await this.partRepository.find();
      return parts.map((part) => new PartResponse(part));
    } catch (error) {
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
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, updatePartDto: UpdatePartDto): Promise<PartResponse> {
    try {
      await this.partRepository.update({ id }, updatePartDto);
      return this.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.partRepository.delete({ id });
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
