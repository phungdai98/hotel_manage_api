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
} from '@nestjs/common';
import { BillService } from './bill.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { BaseController } from 'src/common/base.controller';
import { BillResponse } from './entities/bill.entity';
import { ApiResponse } from 'src/common/entities/typeResponse';

@Controller('bill')
export class BillController extends BaseController {
  constructor(private readonly billService: BillService) {
    super();
  }

  @Post()
  create(@Body() createBillDto: CreateBillDto): Promise<BillResponse> {
    return this.billService.create(createBillDto);
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
