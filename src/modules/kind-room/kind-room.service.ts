import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateKindRoomDto } from './dto/create-kind-room.dto';
import { UpdateKindRoomDto } from './dto/update-kind-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { KindRoom } from 'src/model';
import { Repository } from 'typeorm';
import { KindRoomResponse } from './entities/kind-room.entity';

@Injectable()
export class KindRoomService {
  constructor(
    @InjectRepository(KindRoom)
    private kindRoomRepository: Repository<KindRoom>,
  ) {}
  
  async create(createKindRoomDto: CreateKindRoomDto) {
    try {
      const result = await this.kindRoomRepository.save(createKindRoomDto);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<KindRoomResponse[] | null> {
    try {
      const result = await this.kindRoomRepository.find();
      return result.map((kindRoom) => KindRoomResponse.fromEntity(kindRoom));
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<KindRoomResponse | null> {
    try {
      const result = await this.kindRoomRepository.findOne({ where: { id: id } });
      return result ? KindRoomResponse.fromEntity(result) : null;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateKindRoomDto: UpdateKindRoomDto): Promise<KindRoom | null> {
    try {
      const kindRoom = await this.kindRoomRepository.findOne({ where: { id: id } });
      if (!kindRoom) {
        throw new BadRequestException(`Loại phòng (ID: ${id}) không tồn tại trong hệ thống!`);
      }
      kindRoom.name = updateKindRoomDto.name || kindRoom.name;
      return this.kindRoomRepository.save(kindRoom);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const result = await this.kindRoomRepository.delete(id);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
