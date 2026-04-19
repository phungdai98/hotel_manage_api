import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PartService } from './part.service';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { BaseController } from 'src/common/base.controller';
import { ApiResponse } from 'src/common/entities/typeResponse';
import { PartResponse } from './entities/part.entity';

@Controller('part')
export class PartController extends BaseController {
  constructor(private readonly partService: PartService) {
    super();
  }

  @Post()
  async create(
    @Body() createPartDto: CreatePartDto,
  ): Promise<ApiResponse<null>> {
    return this.partService.create(createPartDto);
  }

  @Get()
  async findAll(): Promise<PartResponse[]> {
    return this.partService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PartResponse> {
    return this.partService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePartDto: UpdatePartDto,
  ): Promise<ApiResponse<null>> {
    return this.partService.update(id, updatePartDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ApiResponse<null>> {
    return this.partService.remove(id);
  }
}
