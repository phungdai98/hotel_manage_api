import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateRankRoomDto } from './dto/create-rank-room.dto';
import { UpdateRankRoomDto } from './dto/update-rank-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RankRoom, Room } from 'src/model';
import { FindOptionsWhere, In, MoreThanOrEqual, Not, Repository } from 'typeorm';
import { RankRoomResponse } from './entities/rank-room.entity';
import { DetailStatusService } from '../detail-status/detail-status.service';

@Injectable()
export class RankRoomService {
  constructor(
    @InjectRepository(RankRoom)
    private rankRoomRepository: Repository<RankRoom>,
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    private readonly detailStatusService: DetailStatusService,
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
      return result.map((item) => new RankRoomResponse(item));
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
      return result ? new RankRoomResponse(result) : null;
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
      return new RankRoomResponse(result);
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

  async findByLimitPeople(quantity: number) {
    return await this.rankRoomRepository.find({
      where: { limitPeople: MoreThanOrEqual(quantity) },
      relations: ['kindRoom', 'typeRoom'],
    });
  }

  async findAvailable(dateCheckIn: string, dateCheckOut: string, quantity: number): Promise<RankRoomResponse[]> {
    try {
      // 1. Lấy các hạng phòng thỏa mãn sức chứa
      const rankRooms = await this.findByLimitPeople(quantity);
      if (!rankRooms.length) return [];

      // 2. Lấy danh sách ID các phòng đang bận
      const busyRoomIds = await this.detailStatusService.findBusyRoomIds(dateCheckIn, dateCheckOut);

      // 3. Lấy ra các phòng thuộc các hạng phòng trên và KHÔNG nằm trong danh sách bận
      const roomWhereClause: FindOptionsWhere<Room> = {
        rankRoomId: In(rankRooms.map((r) => r.id)),
      };
      if (busyRoomIds.length > 0) {
        roomWhereClause.id = Not(In(busyRoomIds));
      }

      const rooms = await this.roomRepository.find({
        where: roomWhereClause,
      });

      // 4. Nhóm kết quả theo Rank và trả về RankRoomResponse
      return rankRooms
        .map((rank) => {
          const availableRooms = rooms.filter((r) => r.rankRoomId === rank.id);
          return {
            ...rank,
            availableCount: availableRooms.length,
            rooms: availableRooms.map(r => ({
              id: r.id,
              name: r.name,
              floor: r.floor
            })),
          };
        })
        .filter((rank) => rank.availableCount > 0)
        .map((rank) => new RankRoomResponse(rank as any));
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
