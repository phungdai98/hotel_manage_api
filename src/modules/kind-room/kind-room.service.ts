import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponse } from 'src/common/entities/typeResponse';
import { KindRoom } from 'src/model';
import { Repository } from 'typeorm';
import { CreateKindRoomDto } from './dto/create-kind-room.dto';
import { UpdateKindRoomDto } from './dto/update-kind-room.dto';
import { KindRoomResponse } from './entities/kind-room.entity';

@Injectable()
export class KindRoomService {
  constructor(
    @InjectRepository(KindRoom)
    private kindRoomRepository: Repository<KindRoom>,
  ) {}

  async create(
    createKindRoomDto: CreateKindRoomDto,
  ): Promise<ApiResponse<null>> {
    try {
      const result = await this.kindRoomRepository.save(createKindRoomDto);
      await this.kindRoomRepository.save(result);
      return new ApiResponse(true, null, 'Create kind room successfully', 200);
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async findAll(): Promise<KindRoomResponse[]> {
    try {
      const result = await this.kindRoomRepository.find();
      return result.map((kindRoom) => KindRoomResponse.fromEntity(kindRoom));
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async findOne(id: string): Promise<KindRoomResponse> {
    try {
      const result = await this.kindRoomRepository.findOne({
        where: { id: id },
      });
      if (!result) {
        throw new NotFoundException(
          `Kind room (ID: ${id}) not found in the system!`,
        );
      }
      return KindRoomResponse.fromEntity(result);
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async update(
    id: string,
    updateKindRoomDto: UpdateKindRoomDto,
  ): Promise<ApiResponse<null>> {
    try {
      const kindRoom = await this.kindRoomRepository.findOne({
        where: { id: id },
      });
      if (!kindRoom) {
        throw new BadRequestException(
          `Loại phòng (ID: ${id}) không tồn tại trong hệ thống!`,
        );
      }
      await this.kindRoomRepository.update(id, updateKindRoomDto);
      return new ApiResponse(true, null, 'Update kind room successfully', 200);
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async remove(id: string): Promise<ApiResponse<null>> {
    try {
      await this.kindRoomRepository.delete(id);
      return new ApiResponse(true, null, 'Delete kind room successfully', 200);
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }
}
