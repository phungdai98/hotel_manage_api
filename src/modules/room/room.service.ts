import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetailStatus, RankRoom, Room } from 'src/model';
import { In, LessThan, MoreThan, MoreThanOrEqual, Not, Repository } from 'typeorm';
import { Response } from 'src/common/response';
import { RoomResponse } from './entities/room.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    @InjectRepository(RankRoom)
    private rankRoomRepository: Repository<RankRoom>,
    @InjectRepository(DetailStatus)
    private detailStatusRepository: Repository<DetailStatus>,
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

  async findAllByRank(dateCheckIn: Date, dateCheckOut: Date, quantity: number): Promise<any> {
    try {
      // 1. Lấy tất cả hạng phòng có sức chứa >= số lượng khách yêu cầu
      const rankRooms = await this.rankRoomRepository.find({
        where: { limitPeople: MoreThanOrEqual(quantity) },
        relations: ['kindRoom', 'typeRoom']
      });

      if (!rankRooms.length) return [];

      // 2. Tìm các roomId đang bận (có lịch overlap) trong khoảng thời gian này
      // const busyDetailStatuses = await this.detailStatusRepository.find({
      //   where: {
      //     dateStart: LessThan(dateCheckOut),
      //     dateEnd: MoreThan(dateCheckIn)
      //   },
      //   select: { roomId: true }
      // });
      
      // const busyRoomIds = [...new Set(busyDetailStatuses.map(ds => ds.roomId))];

      // // 3. Lấy ra các phòng thuộc các hạng phòng trên và KHÔNG nằm trong danh sách bận
      // const rooms = await this.roomRepository.find({
      //   where: {
      //     rankRoomId: In(rankRooms.map(r => r.id)),
      //     id: busyRoomIds.length > 0 ? Not(In(busyRoomIds)) : undefined
      //   }
      // });

      // // 4. Nhóm kết quả theo RankRoom để trả về cho Client hiển thị
      // const result = rankRooms.map(rank => {
      //   const availableRooms = rooms.filter(r => r.rankRoomId === rank.id);
      //   return {
      //     ...rank,
      //     availableCount: availableRooms.length,
      //     rooms: availableRooms
      //   };
      // }).filter(r => r.availableCount > 0);

      // return result;
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
