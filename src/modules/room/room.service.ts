import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from 'src/model';
import { In, Not, Repository } from 'typeorm';
import { Response } from 'src/common/response';
import { RoomResponse } from './entities/room.entity';
import { RankRoomService } from '../rank-room/rank-room.service';
import { DetailStatusService } from '../detail-status/detail-status.service';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    private readonly rankRoomService: RankRoomService,
    private readonly detailStatusService: DetailStatusService,
  ) {}
  async create(createRoomDto: CreateRoomDto): Promise<Response> {
    try {
      const room = this.roomRepository.create(createRoomDto);
      await this.roomRepository.save(room);
      return new Response('Room created successfully', 201);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<RoomResponse[]> {
    try {
      const rooms = await this.roomRepository.find();
      return rooms.map((room) => new RoomResponse(room));
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAllByRank(dateCheckIn: string, dateCheckOut: string, quantity: number): Promise<any> {
    try {
      // 1. Gọi RankRoomService để lấy các hạng phòng thỏa mãn sức chứa
      const rankRooms = await this.rankRoomService.findByLimitPeople(quantity);

      if (!rankRooms.length) return [];

      // 2. Gọi DetailStatusService để lấy danh sách ID các phòng đang bận
      const busyRoomIds = await this.detailStatusService.findBusyRoomIds(dateCheckIn, dateCheckOut);

      // 3. Lấy ra các phòng thuộc các hạng phòng trên và KHÔNG nằm trong danh sách bận
      const rooms = await this.roomRepository.find({
        where: {
          rankRoomId: In(rankRooms.map((r) => r.id)),
          id: busyRoomIds.length > 0 ? Not(In(busyRoomIds)) : undefined,
        },
      });

      // 4. Nhóm kết quả theo Rank để trả về cho Client
      return rankRooms
        .map((rank) => {
          const availableRooms = rooms.filter((r) => r.rankRoomId === rank.id);
          return {
            ...rank,
            availableCount: availableRooms.length,
            rooms: availableRooms,
          };
        })
        .filter((r) => r.availableCount > 0);
    } catch (error) {
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
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, updateRoomDto: UpdateRoomDto): Promise<Response> {
    try {
      const room = await this.roomRepository.findOne({ where: { id: id } });
      if (!room) {
        throw new NotFoundException('Room not found');
      }
      await this.roomRepository.update(id, updateRoomDto);
      return new Response('Room updated successfully', 200);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: string): Promise<Response> {
    try {
      const room = await this.roomRepository.findOne({ where: { id: id } });
      if (!room) {
        throw new NotFoundException('Room not found');
      }
      await this.roomRepository.remove(room);
      return new Response('Room deleted successfully', 200);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
