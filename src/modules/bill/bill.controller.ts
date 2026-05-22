import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  Req,
} from '@nestjs/common';
import { BillService } from './bill.service';
import { CreateBillAndUpdateRentDto, CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { BaseController } from 'src/common/base.controller';
import { BillResponse } from './entities/bill.entity';
import { ApiResponse } from 'src/common/entities/typeResponse';
import { UserAuthResponse } from '../auth/entities/auth.entity';

@Controller('bill')
export class BillController extends BaseController {
  constructor(private readonly billService: BillService) {
    super();
  }

  @Post()

  create(@Req() req, @Body() createBillDto: CreateBillAndUpdateRentDto): Promise<BillResponse> {
    const user = req.user as UserAuthResponse;
    const userId = user.userId;
    return this.billService.create(createBillDto, userId);
  }

  @Get()
  findAll(
    @Query() query: { page: number; limit: number; search: string },
  ): Promise<BillResponse[]> {
    return this.billService.findAll(query.page, query.limit, query.search);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<BillResponse> {
    return this.billService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBillDto: UpdateBillDto,
  ): Promise<ApiResponse<null>> {
    return this.billService.update(id, updateBillDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<ApiResponse<null>> {
    return this.billService.remove(id);
  }
}
