import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRankRoomDto } from './dto/create-rank-room.dto';
import { UpdateRankRoomDto } from './dto/update-rank-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RankRoom } from 'src/model';
import { Repository } from 'typeorm';
import { RankRoomResponse } from './entities/rank-room.entity';

@Injectable()
export class RankRoomService {
  constructor(
    @InjectRepository(RankRoom)
    private rankRoomRepository: Repository<RankRoom>,
  ) {}
  async create(createRankRoomDto: CreateRankRoomDto) {
    try {
      const result = await this.rankRoomRepository.save(createRankRoomDto);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<RankRoomResponse[] | null> {
    try {
      const result = await this.rankRoomRepository.find({
        relations: ['kindRoom', 'typeRoom'],
      });
      return result.map((item) => RankRoomResponse.fromEntity(item));
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<RankRoomResponse | null> {
    try {
      const result = await this.rankRoomRepository.findOne({ 
        where: { id: id },
        relations: ['kindRoom', 'typeRoom'],
      });
      return result ? RankRoomResponse.fromEntity(result) : null;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateRankRoomDto: UpdateRankRoomDto): Promise<RankRoomResponse | null> {
    try {
      const rankRoom = await this.rankRoomRepository.findOne({ where: { id: id } });
      if (!rankRoom) {
        throw new BadRequestException(`Hạng phòng (ID: ${id}) không tồn tại trong hệ thống!`);
      }
      rankRoom.urlImage = updateRankRoomDto.urlImage || rankRoom.urlImage;
      rankRoom.limitPeople = updateRankRoomDto.limitPeople || rankRoom.limitPeople;
      rankRoom.kindRoomId = updateRankRoomDto.kindRoomId || rankRoom.kindRoomId;
      rankRoom.typeRoomId = updateRankRoomDto.typeRoomId || rankRoom.typeRoomId;
      const result = await this.rankRoomRepository.save(rankRoom);
      return RankRoomResponse.fromEntity(result);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const result = await this.rankRoomRepository.delete(id);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
