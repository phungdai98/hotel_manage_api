import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { RentService } from './rent.service';
import { CreateRentDto } from './dto/create-rent.dto';
import { UpdateRentDto } from './dto/update-rent.dto';
import { BaseController } from 'src/common/base.controller';
import { ApiResponse } from 'src/common/entities/typeResponse';
import { RentResponse } from './entities/rent.entity';

@Controller('rent')
export class RentController extends BaseController {
  constructor(private readonly rentService: RentService) {
    super();
  }

  @Post()
  create(@Body() createRentDto: CreateRentDto): Promise<ApiResponse<null>> {
    return this.rentService.create(createRentDto);
  }

  @Get()
  findAll(): Promise<RentResponse[]> {
    return this.rentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.rentService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRentDto: UpdateRentDto,
  ): Promise<ApiResponse<null>> {
    return this.rentService.update(id, updateRentDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<ApiResponse<null>> {
    return this.rentService.remove(id);
  }
}
