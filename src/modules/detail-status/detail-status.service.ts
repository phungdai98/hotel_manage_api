import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateDetailStatusDto } from './dto/create-detail-status.dto';
import { UpdateDetailStatusDto } from './dto/update-detail-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetailStatus } from 'src/model';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { DetailStatusResponse, RentTicketIdResponse } from './entities/detail-status.entity';
import { StatusRoomEnum } from 'src/common/enums/statusRoomEnum';
import { ApiResponse } from 'src/common/entities/typeResponse';
import { RoomService } from '../room/room.service';
import { RentService } from '../rent/rent.service';
@Injectable()
export class DetailStatusService {
  constructor(
    @InjectRepository(DetailStatus)
    private readonly _detailStatusRepository: Repository<DetailStatus>,
    private readonly _roomService: RoomService,
    private readonly _rentService: RentService,
  ) {}

  async create(
    createDetailStatusDto: CreateDetailStatusDto,
  ): Promise<ApiResponse<null>> {
    try {
      const detailStatus = this._detailStatusRepository.create(
        createDetailStatusDto,
      );
      await this._detailStatusRepository.save(detailStatus);
      return new ApiResponse(
        true,
        null,
        `Create detail status successfully`,
        200,
      );
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async findAll(): Promise<DetailStatusResponse[]> {
    try {
      const detailStatuses = await this._detailStatusRepository.find();
      return detailStatuses.map(
        (detailStatus) => new DetailStatusResponse(detailStatus),
      );
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async findOne(id: string): Promise<DetailStatusResponse> {
    try {
      const detailStatus = await this._detailStatusRepository.findOne({
        where: { id },
      });
      if (!detailStatus) {
        throw new NotFoundException(`Detail status ${id} not found`);
      }
      return new DetailStatusResponse(detailStatus);
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async update(
    id: string,
    updateDetailStatusDto: UpdateDetailStatusDto,
  ): Promise<ApiResponse<null>> {
    try {
      const detailStatus = await this._detailStatusRepository.findOne({
        where: { id },
      });
      if (!detailStatus) {
        throw new NotFoundException(`Detail status ${id} not found`);
      }
      this._detailStatusRepository.merge(detailStatus, updateDetailStatusDto);
      await this._detailStatusRepository.save(detailStatus);
      return new ApiResponse(
        true,
        null,
        `Update detail status ${id} successfully`,
        200,
      );
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async remove(id: string): Promise<ApiResponse<null>> {
    try {
      const detailStatus = await this._detailStatusRepository.findOne({
        where: { id },
      });
      if (!detailStatus) {
        throw new NotFoundException(`Detail status ${id} not found`);
      }
      await this._detailStatusRepository.remove(detailStatus);
      return new ApiResponse(
        true,
        null,
        `Delete detail status ${id} successfully`,
        200,
      );
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async findBusyRoomIds(
    dateCheckIn: string,
    dateCheckOut: string,
  ): Promise<string[]> {
    // 1. Convert string sang Date và chuẩn hóa về 12:00 UTC để khớp với dữ liệu trong DB
    const checkIn = new Date(dateCheckIn);

    const checkOut = new Date(dateCheckOut);

    // 2. Thực hiện truy vấn với đối tượng Date đã chuẩn hóa
    const busyDetailStatuses = await this._detailStatusRepository.find({
      where: {
        dateStart: LessThan(checkOut),
        dateEnd: MoreThan(checkIn),
      },
      select: { roomId: true },
    });
    return [...new Set(busyDetailStatuses.map((ds) => ds.roomId))];
  }

  async countUnavailableRoomsByRankIds(
    dateCheckIn: string,
    dateCheckOut: string,
    rankRoomIds: string[],
  ): Promise<Record<string, number>> {
    const checkIn = new Date(dateCheckIn);
    const checkOut = new Date(dateCheckOut);

    const rows = await this._detailStatusRepository
      .createQueryBuilder('detailStatus')
      .select('room.rankRoomId', 'rankRoomId')
      .addSelect('COUNT(DISTINCT detailStatus.roomId)', 'unavailableCount')
      .innerJoin('detailStatus.room', 'room')
      .where('room.rankRoomId IN (:...rankRoomIds)', { rankRoomIds })
      .andWhere('detailStatus.dateStart < :checkOut', { checkOut })
      .andWhere('detailStatus.dateEnd > :checkIn', { checkIn })
      .andWhere('detailStatus.status IN (:...statusNames)', {
        statusNames: [
          StatusRoomEnum.MAINTENANCE,
          StatusRoomEnum.BROKEN,
          StatusRoomEnum.OUT_OF_SERVICE,
          StatusRoomEnum.OCCUPIED,
        ],
      })
      .groupBy('room.rankRoomId')
      .getRawMany<{ rankRoomId: string; unavailableCount: string }>();

    return rows.reduce(
      (acc, row) => {
        acc[row.rankRoomId] = Number(row.unavailableCount);
        return acc;
      },
      {} as Record<string, number>,
    );
  }

  async findRentTicketIdByRoomName(roomName: string): Promise<RentTicketIdResponse> {
    try {
      const room = await this._roomService.findRoomIdByName(roomName);
      if (!room) {
        throw new NotFoundException('Room not found');
      }
      const detailStatuses = await this._detailStatusRepository.findOne({
        select: {
          rentTicketId: true,
          roomId: true,
        },
        where: {
          roomId: room.id,
          status: StatusRoomEnum.OCCUPIED,
        },
      });
      if (!detailStatuses) {
        throw new NotFoundException('Detail status not found');
      }
      const rent = await this._rentService.findIdRentFromRentTicketId(detailStatuses.rentTicketId || "", detailStatuses.roomId);
      if (!rent) {
        throw new NotFoundException('Rent not found');
      }
      return new RentTicketIdResponse({rentTicketId: detailStatuses.rentTicketId, roomId: rent.roomId, rentId: rent.id});
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }
}

// SELECT
//   r.rank_room_id,
//   COUNT(DISTINCT ds.room_id) AS blocked_rooms
// FROM public.detail_status AS ds
// JOIN public.room AS r
//   ON ds.room_id = r.id
// WHERE r.rank_room_id IN (
//   '90aaf0ba-b97b-4a47-8eb6-e1e79dd8898c',
//   '188f2e80-ae21-4d4c-9de1-157612ec9e01'
// )
// AND ds.status IN ('maintenance', 'broken', 'occupied', 'out_of_service')
// AND tsrange(ds.date_start, ds.date_end)
//     && tsrange(
//          TIMESTAMP '2026-04-19 12:00:00',
//          TIMESTAMP '2026-04-21 12:00:00'
//        )
// GROUP BY r.rank_room_id;
