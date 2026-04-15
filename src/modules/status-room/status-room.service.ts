import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateStatusRoomDto } from './dto/create-status-room.dto';
import { UpdateStatusRoomDto } from './dto/update-status-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusRoom } from 'src/model';
import { Repository } from 'typeorm';
import { StatusRoomResponse } from './entities/status-room.entity';
import { ApiResponse } from 'src/common/entities/typeResponse';
import { ErrorResponseWithStatusCode } from 'src/common/entities/errorEntity';

@Injectable()
export class StatusRoomService {
  constructor(
    @InjectRepository(StatusRoom)
    private readonly statusRoomRepository: Repository<StatusRoom>,
  ) {}

  async create(createStatusRoomDto: CreateStatusRoomDto): Promise<ApiResponse<null>> {
    try {
      const statusRoom = this.statusRoomRepository.create(createStatusRoomDto);
      await this.statusRoomRepository.save(statusRoom);
      return new ApiResponse(true, null, 'Status room created successfully', 201);
    } catch (error: ErrorResponseWithStatusCode) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<StatusRoomResponse[]> {
    try {
      const statusRooms = await this.statusRoomRepository.find();
      return statusRooms.map((statusRoom) => new StatusRoomResponse(statusRoom));
    } catch (error: ErrorResponseWithStatusCode) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: string): Promise<StatusRoomResponse> {
    try {
      const statusRoom = await this.statusRoomRepository.findOne({ where: { id } });
      if (!statusRoom) {
        throw new NotFoundException('Status room not found');
      }
      return new StatusRoomResponse(statusRoom);
    } catch (error: ErrorResponseWithStatusCode) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, updateStatusRoomDto: UpdateStatusRoomDto): Promise<ApiResponse<null>> {
    try {
      const statusRoom = await this.statusRoomRepository.findOne({ where: { id } });
      if (!statusRoom) {
        throw new NotFoundException('Status room not found');
      }
      await this.statusRoomRepository.update(id, updateStatusRoomDto);
      return new ApiResponse(true, null, 'Status room updated successfully', 200);
    } catch (error: ErrorResponseWithStatusCode) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: string): Promise<ApiResponse<null>> {
    try {
      const statusRoom = await this.statusRoomRepository.findOne({ where: { id } });
      if (!statusRoom) {
        throw new NotFoundException('Status room not found');
      }
      await this.statusRoomRepository.remove(statusRoom);
      return new ApiResponse(true, null, 'Status room deleted successfully', 200);
    } catch (error: ErrorResponseWithStatusCode) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
