import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTypeRoomDto } from './dto/create-type-room.dto';
import { UpdateTypeRoomDto } from './dto/update-type-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeRoom } from 'src/model';
import { Repository } from 'typeorm';
import { TypeRoomResponse } from './entities/type-room.entity';

@Injectable()
export class TypeRoomService {
  constructor(
    @InjectRepository(TypeRoom)
    private typeRoomRepository: Repository<TypeRoom>,
  ) {}
  async create(createTypeRoomDto: CreateTypeRoomDto): Promise<TypeRoomResponse | null> {
    try {
      const result = await this.typeRoomRepository.save(createTypeRoomDto);
      return TypeRoomResponse.fromEntity(result);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<TypeRoomResponse[] | null> {
    try {
      const result = await this.typeRoomRepository.find();
      return result.map((item) => TypeRoomResponse.fromEntity(item));
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<TypeRoomResponse | null> {
    try {
      const result = await this.typeRoomRepository.findOne({ where: { id: id } });
      return result ? TypeRoomResponse.fromEntity(result) : null;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateTypeRoomDto: UpdateTypeRoomDto): Promise<TypeRoomResponse | null> {
    try {
      const typeRoom = await this.typeRoomRepository.findOne({ where: { id: id } });
      if (!typeRoom) {
        throw new BadRequestException(`Loại phòng (ID: ${id}) không tồn tại trong hệ thống!`);
      }
      typeRoom.name = updateTypeRoomDto.name || typeRoom.name;
      return this.typeRoomRepository.save(typeRoom);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const result = await this.typeRoomRepository.delete(id);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
