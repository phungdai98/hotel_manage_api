import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
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
      const rankRoom = this.rankRoomRepository.create(createRankRoomDto);
      const result = await this.rankRoomRepository.save(rankRoom);
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<RankRoomResponse[] | null> {
    try {
      const result = await this.rankRoomRepository.find({
        relations: ['kindRoom', 'typeRoom'],
      });
      return result.map((item) => RankRoomResponse.fromEntity(item));
    } catch (error) {
      throw new InternalServerErrorException(error.message);
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
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, updateRankRoomDto: UpdateRankRoomDto): Promise<RankRoomResponse | null> {
    try {
      const rankRoom = await this.rankRoomRepository.findOne({ where: { id: id } });
      if (!rankRoom) {
        throw new BadRequestException(`Rank room (ID: ${id}) not found!`);
      }
      rankRoom.urlImage = updateRankRoomDto.urlImage || rankRoom.urlImage;
      rankRoom.limitPeople = updateRankRoomDto.limitPeople || rankRoom.limitPeople;
      rankRoom.kindRoomId = updateRankRoomDto.kindRoomId || rankRoom.kindRoomId;
      rankRoom.typeRoomId = updateRankRoomDto.typeRoomId || rankRoom.typeRoomId;
      const result = await this.rankRoomRepository.save(rankRoom);
      return RankRoomResponse.fromEntity(result);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const result = await this.rankRoomRepository.delete(id);
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
