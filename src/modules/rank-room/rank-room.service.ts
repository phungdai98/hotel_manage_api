import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateRankRoomDto } from './dto/create-rank-room.dto';
import { UpdateRankRoomDto } from './dto/update-rank-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RankRoom, Room } from 'src/model';
import { In, MoreThanOrEqual, Repository } from 'typeorm';
import { RankRoomResponse } from './entities/rank-room.entity';
import { DetailOrderTicketService } from '../detail-order-ticket/detail-order-ticket.service';
import { DetailStatusService } from '../detail-status/detail-status.service';
import { ApiResponse } from 'src/common/entities/typeResponse';
import { ErrorResponseWithStatusCode } from 'src/common/entities/errorEntity';

@Injectable()
export class RankRoomService {
  constructor(
    @InjectRepository(RankRoom)
    private rankRoomRepository: Repository<RankRoom>,
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    private readonly detailOrderTicketService: DetailOrderTicketService,
    private readonly detailStatusService: DetailStatusService,
  ) {}
  async create(createRankRoomDto: CreateRankRoomDto): Promise<ApiResponse<null>> {
    try {
      const rankRoom = this.rankRoomRepository.create(createRankRoomDto);
      await this.rankRoomRepository.save(rankRoom);
      return new ApiResponse(true, null, 'Rank room created successfully', 201);
    } catch (error: ErrorResponseWithStatusCode) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<RankRoomResponse[]> {
    try {
      const result = await this.rankRoomRepository.find({
        relations: ['kindRoom', 'typeRoom'],
      });
      return result.map((item) => new RankRoomResponse(item));
    } catch (error: ErrorResponseWithStatusCode) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: string): Promise<RankRoomResponse> {
    try {
      const result = await this.rankRoomRepository.findOne({ 
        where: { id: id },
        relations: ['kindRoom', 'typeRoom'],
      });
      if (!result) {
        throw new BadRequestException(`Rank room (ID: ${id}) not found!`);
      }
      return new RankRoomResponse(result);
    } catch (error: ErrorResponseWithStatusCode) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, updateRankRoomDto: UpdateRankRoomDto): Promise<ApiResponse<null>> {
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
      return new ApiResponse(true, null, 'Rank room updated successfully', 200);
    } catch (error: ErrorResponseWithStatusCode) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: string): Promise<ApiResponse<null>> {
    try {
      const rankRoom = await this.rankRoomRepository.findOne({ where: { id: id } });
      if (!rankRoom) {
        throw new BadRequestException(`Rank room (ID: ${id}) not found!`);
      }
      await this.rankRoomRepository.delete(id);
      return new ApiResponse(true, null, 'Rank room deleted successfully', 200);
    } catch (error: ErrorResponseWithStatusCode) {
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

      const rankRoomIds = rankRooms.map((r) => r.id);

      // 2. Lấy tổng số phòng trong mỗi hạng
      const rooms = await this.roomRepository.find({
        where: { rankRoomId: In(rankRoomIds) },
        select: ['rankRoomId'],
      });
      const totalRoomCounts = rooms.reduce((acc, room) => {
        acc[room.rankRoomId] = (acc[room.rankRoomId] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      // 3. Lấy tổng số phòng đã đặt theo hạng trong khoảng ngày
      const bookedQuantities = await this.detailOrderTicketService.countBookedQuantityByRankIds(
        dateCheckIn,
        dateCheckOut,
        rankRoomIds,
      );

      // 4. Lấy tổng số phòng không thể dùng do bảo trì/hỏng trong khoảng ngày
      const unavailableRoomCounts = await this.detailStatusService.countUnavailableRoomsByRankIds(
        dateCheckIn,
        dateCheckOut,
        rankRoomIds,
      );

      // 5. Tính số phòng còn trống theo hạng
      return rankRooms
        .map((rank) => {
          const totalRooms = totalRoomCounts[rank.id] || 0;
          const booked = bookedQuantities[rank.id] || 0;
          const unavailable = unavailableRoomCounts[rank.id] || 0;
          const availableCount = Math.max(totalRooms - booked - unavailable, 0);

          if (availableCount <= 0) return null;

          const response = new RankRoomResponse(rank);
          response.availableCount = availableCount;
          return response;
        })
        .filter((rank): rank is RankRoomResponse => rank !== null);
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
