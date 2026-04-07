import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from 'src/model';
import { Repository } from 'typeorm';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}
  async create(createRoomDto: CreateRoomDto) {
    try {
      const result = await this.roomRepository.save(createRoomDto);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const result = await this.roomRepository.find();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.roomRepository.findOne({ where: { id: id } });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateRoomDto: UpdateRoomDto) {
    try {
      const result = await this.roomRepository.update(id, updateRoomDto);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const result = await this.roomRepository.delete(id);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
