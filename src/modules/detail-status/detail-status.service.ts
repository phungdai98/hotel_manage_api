import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDetailStatusDto } from './dto/create-detail-status.dto';
import { UpdateDetailStatusDto } from './dto/update-detail-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetailStatus } from 'src/model';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { Response } from 'src/common/response';
import { DetailStatusResponse } from './entities/detail-status.entity';

@Injectable()
export class DetailStatusService {
  constructor(
    @InjectRepository(DetailStatus)
    private readonly detailStatusRepository: Repository<DetailStatus>,
  ) {}

  async create(createDetailStatusDto: CreateDetailStatusDto): Promise<Response> {
    try {
      const detailStatus = this.detailStatusRepository.create(createDetailStatusDto);
      await this.detailStatusRepository.save(detailStatus);
      return new Response(`Create detail status successfully`, 200);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<DetailStatusResponse[]> {
    try {
      const detailStatuses = await this.detailStatusRepository.find();
      return detailStatuses.map((detailStatus) => new DetailStatusResponse(detailStatus));
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: string): Promise<DetailStatusResponse> {
    try {
      const detailStatus = await this.detailStatusRepository.findOne({ where: { id } });
      if (!detailStatus) {
        throw new NotFoundException(`Detail status ${id} not found`);
      }
      return new DetailStatusResponse(detailStatus);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, updateDetailStatusDto: UpdateDetailStatusDto): Promise<Response> {
    try {
      const detailStatus = await this.detailStatusRepository.findOne({ where: { id } });
      if (!detailStatus) {
        throw new NotFoundException(`Detail status ${id} not found`);
      }
      this.detailStatusRepository.merge(detailStatus, updateDetailStatusDto);
      await this.detailStatusRepository.save(detailStatus);
      return new Response(`Update detail status ${id} successfully`, 200);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: string): Promise<Response> {
    try {
      const detailStatus = await this.detailStatusRepository.findOne({ where: { id } });
      if (!detailStatus) {
        throw new NotFoundException(`Detail status ${id} not found`);
      }
      await this.detailStatusRepository.remove(detailStatus);
      return new Response(`Delete detail status ${id} successfully`, 200);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findBusyRoomIds(dateCheckIn: string, dateCheckOut: string): Promise<string[]> {
    // 1. Convert string sang Date và chuẩn hóa về 12:00 UTC để khớp với dữ liệu trong DB
    const checkIn = new Date(dateCheckIn);
    checkIn.setUTCHours(12, 0, 0, 0);

    const checkOut = new Date(dateCheckOut);
    checkOut.setUTCHours(12, 0, 0, 0);

    // 2. Thực hiện truy vấn với đối tượng Date đã chuẩn hóa
    const busyDetailStatuses = await this.detailStatusRepository.find({
      where: {
        dateStart: LessThan(checkOut as any),
        dateEnd: MoreThan(checkIn as any),
      },
      select: { roomId: true },
    });
    return [...new Set(busyDetailStatuses.map((ds) => ds.roomId))];
  }
}
