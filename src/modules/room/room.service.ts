import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from 'src/model';
import { Repository } from 'typeorm';

import { RoomResponse } from './entities/room.entity';
import { ApiResponse } from 'src/common/entities/typeResponse';
import { ErrorResponseWithStatusCode } from 'src/common/entities/errorEntity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}
  async create(createRoomDto: CreateRoomDto): Promise<ApiResponse<null>> {
    try {
      const room = this.roomRepository.create(createRoomDto);
      await this.roomRepository.save(room);
      return new ApiResponse(true, null, 'Room created successfully', 201);
    } catch (error: ErrorResponseWithStatusCode) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<RoomResponse[]> {
    try {
      const rooms = await this.roomRepository.find();
      return rooms.map((room) => new RoomResponse(room));
    } catch (error: ErrorResponseWithStatusCode) {
      throw new InternalServerErrorException(error.message);
    }
  }



  async findOne(id: string): Promise<RoomResponse> {
    try {
      const room = await this.roomRepository.findOne({ where: { id: id } });
      if (!room) {
        throw new NotFoundException('Room not found');
      }
      return new RoomResponse(room);
    } catch (error: ErrorResponseWithStatusCode) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, updateRoomDto: UpdateRoomDto): Promise<ApiResponse<null>> {
    try {
      const room = await this.roomRepository.findOne({ where: { id: id } });
      if (!room) {
        throw new NotFoundException('Room not found');
      }
      await this.roomRepository.update(id, updateRoomDto);
      return new ApiResponse(true, null, 'Room updated successfully', 200);
    } catch (error: ErrorResponseWithStatusCode) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: string): Promise<ApiResponse<null>> {
    try {
      const room = await this.roomRepository.findOne({ where: { id: id } });
      if (!room) {
        throw new NotFoundException('Room not found');
      }
      await this.roomRepository.remove(room);
      return new ApiResponse(true, null, 'Room deleted successfully', 200);
    } catch (error: ErrorResponseWithStatusCode) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
