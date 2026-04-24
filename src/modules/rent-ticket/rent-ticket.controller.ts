import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { RentTicketService } from './rent-ticket.service';
import { CreateRentTicketDto } from './dto/create-rent-ticket.dto';
import { UpdateRentTicketDto } from './dto/update-rent-ticket.dto';
import { BaseController } from 'src/common/base.controller';
import { ApiResponse } from 'src/common/entities/typeResponse';
import { RentTicketResponse } from './entities/rent-ticket.entity';
import { AuthGuard } from '../auth/auth.guard';
import { UserAuthResponse } from '../auth/entities/auth.entity';

@Controller('rent-ticket')
export class RentTicketController extends BaseController {
  constructor(private readonly rentTicketService: RentTicketService) {
    super();
  }

  @Post()
  @UseGuards(AuthGuard)
  create(
    @Req() req,
    @Body() createRentTicketDto: CreateRentTicketDto,
  ): Promise<ApiResponse<RentTicketResponse>> {
    const user = req.user as UserAuthResponse;
    const userId = user.userId;
    return this.rentTicketService.create(createRentTicketDto, userId);
  }

  @Get()
  findAll(): Promise<RentTicketResponse[]> {
    return this.rentTicketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<RentTicketResponse> {
    return this.rentTicketService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRentTicketDto: UpdateRentTicketDto,
  ): Promise<ApiResponse<null>> {
    return this.rentTicketService.update(id, updateRentTicketDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<ApiResponse<null>> {
    return this.rentTicketService.remove(id);
  }
}
