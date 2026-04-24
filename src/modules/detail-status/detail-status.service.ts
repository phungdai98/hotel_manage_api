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
import { DetailStatusResponse } from './entities/detail-status.entity';
import { StatusRoomEnum } from 'src/common/enums/statusRoomEnum';
import { ApiResponse } from 'src/common/entities/typeResponse';
@Injectable()
export class DetailStatusService {
  constructor(
    @InjectRepository(DetailStatus)
    private readonly detailStatusRepository: Repository<DetailStatus>,
  ) {}

  async create(
    createDetailStatusDto: CreateDetailStatusDto,
  ): Promise<ApiResponse<null>> {
    try {
      const detailStatus = this.detailStatusRepository.create(
        createDetailStatusDto,
      );
      await this.detailStatusRepository.save(detailStatus);
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
      const detailStatuses = await this.detailStatusRepository.find();
      return detailStatuses.map(
        (detailStatus) => new DetailStatusResponse(detailStatus),
      );
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async findOne(id: string): Promise<DetailStatusResponse> {
    try {
      const detailStatus = await this.detailStatusRepository.findOne({
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
      const detailStatus = await this.detailStatusRepository.findOne({
        where: { id },
      });
      if (!detailStatus) {
        throw new NotFoundException(`Detail status ${id} not found`);
      }
      this.detailStatusRepository.merge(detailStatus, updateDetailStatusDto);
      await this.detailStatusRepository.save(detailStatus);
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
      const detailStatus = await this.detailStatusRepository.findOne({
        where: { id },
      });
      if (!detailStatus) {
        throw new NotFoundException(`Detail status ${id} not found`);
      }
      await this.detailStatusRepository.remove(detailStatus);
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
    const busyDetailStatuses = await this.detailStatusRepository.find({
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

    const rows = await this.detailStatusRepository
      .createQueryBuilder('detailStatus')
      .select('room.rankRoomId', 'rankRoomId')
      .addSelect('COUNT(DISTINCT detailStatus.roomId)', 'unavailableCount')
      .innerJoin('detailStatus.room', 'room')
      .innerJoin('detailStatus.status', 'statusRoom')
      .where('room.rankRoomId IN (:...rankRoomIds)', { rankRoomIds })
      .andWhere('detailStatus.dateStart < :checkOut', { checkOut })
      .andWhere('detailStatus.dateEnd > :checkIn', { checkIn })
      .andWhere('statusRoom.name IN (:...statusNames)', {
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
}
