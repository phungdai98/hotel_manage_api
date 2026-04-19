import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateTypeRoomDto } from './dto/create-type-room.dto';
import { UpdateTypeRoomDto } from './dto/update-type-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeRoom } from 'src/model';
import { Repository } from 'typeorm';
import { TypeRoomResponse } from './entities/type-room.entity';
import { ApiResponse } from 'src/common/entities/typeResponse';

@Injectable()
export class TypeRoomService {
  constructor(
    @InjectRepository(TypeRoom)
    private typeRoomRepository: Repository<TypeRoom>,
  ) {}
  async create(
    createTypeRoomDto: CreateTypeRoomDto,
  ): Promise<ApiResponse<null>> {
    try {
      const result: TypeRoom =
        this.typeRoomRepository.create(createTypeRoomDto);
      await this.typeRoomRepository.save(result);
      return new ApiResponse(true, null, 'Type room created successfully', 201);
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async findAll(): Promise<TypeRoomResponse[]> {
    try {
      const result = await this.typeRoomRepository.find();
      return result.map((item) => TypeRoomResponse.fromEntity(item));
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async findOne(id: string): Promise<TypeRoomResponse> {
    try {
      const result = await this.typeRoomRepository.findOne({
        where: { id: id },
      });
      if (!result) {
        throw new BadRequestException(
          `Loại phòng (ID: ${id}) không tồn tại trong hệ thống!`,
        );
      }
      return TypeRoomResponse.fromEntity(result);
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async update(
    id: string,
    updateTypeRoomDto: UpdateTypeRoomDto,
  ): Promise<ApiResponse<null>> {
    try {
      const typeRoom = await this.typeRoomRepository.findOne({
        where: { id: id },
      });
      if (!typeRoom) {
        throw new BadRequestException(
          `Loại phòng (ID: ${id}) không tồn tại trong hệ thống!`,
        );
      }
      typeRoom.name = updateTypeRoomDto.name || typeRoom.name;
      await this.typeRoomRepository.save(typeRoom);
      return new ApiResponse(true, null, 'Type room updated successfully', 200);
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async remove(id: string) {
    try {
      const typeRoom = await this.typeRoomRepository.findOne({
        where: { id: id },
      });
      if (!typeRoom) {
        throw new BadRequestException(
          `Loại phòng (ID: ${id}) không tồn tại trong hệ thống!`,
        );
      }

      await this.typeRoomRepository.delete(id);
      return new ApiResponse(true, null, 'Type room deleted successfully', 200);
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }
}
