import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DetailStatus, Room } from 'src/model';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

import { ApiResponse } from 'src/common/entities/typeResponse';
import { RoomResponse } from './entities/room.entity';
import { StatusRoomEnum } from 'src/common/enums/statusRoomEnum';

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
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async findAll(): Promise<RoomResponse[]> {
    try {
      const rooms = await this.roomRepository.find();
      return rooms.map((room) => new RoomResponse(room));
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
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
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async update(
    id: string,
    updateRoomDto: UpdateRoomDto,
  ): Promise<ApiResponse<null>> {
    try {
      const room = await this.roomRepository.findOne({ where: { id: id } });
      if (!room) {
        throw new NotFoundException('Room not found');
      }
      await this.roomRepository.update(id, updateRoomDto);
      return new ApiResponse(true, null, 'Room updated successfully', 200);
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
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
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async findAvailableRoomsByRank(
    dateCheckIn: string,
    dateCheckOut: string,
    rankRoomId: string,
  ): Promise<RoomResponse[]> {
    const checkIn = new Date(dateCheckIn);
    const checkOut = new Date(dateCheckOut);

    return this.roomRepository
      .createQueryBuilder('room')
      .where('room.rankRoomId = :rankRoomId', { rankRoomId })
      .andWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .select('1')
          .from(DetailStatus, 'ds')
          .where('ds.room_id = room.id')
          .andWhere('ds.date_start < :checkOut')
          .andWhere('ds.date_end > :checkIn')
          .andWhere('ds.status IN (:...statusNames)')
          .getQuery();
        return 'NOT EXISTS ' + subQuery;
      })
      .setParameters({
        checkIn,
        checkOut,
        statusNames: [
          StatusRoomEnum.MAINTENANCE,
          StatusRoomEnum.BROKEN,
          StatusRoomEnum.OUT_OF_SERVICE,
          StatusRoomEnum.OCCUPIED,
        ],
      })
      .getMany()
      .then((rooms) => rooms.map((room) => new RoomResponse(room)));
  }

  async findRoomIdByName(name: string): Promise<RoomResponse> {
    try {
      const room = await this.roomRepository.findOne({ where: { name: name } });
      if (!room) {
        throw new NotFoundException('Room not found');
      }
      return new RoomResponse(room);
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }
}
