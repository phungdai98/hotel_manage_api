import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { BaseController } from 'src/common/base.controller';
import { ApiResponse } from 'src/common/entities/typeResponse';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { SaleResponse } from './entities/sale.entity';
import { SaleService } from './sale.service';

@Controller('sale')
export class SaleController extends BaseController {
  constructor(private readonly saleService: SaleService) {
    super();
  }

  @Post()
  create(@Body() createSaleDto: CreateSaleDto): Promise<ApiResponse<null>> {
    return this.saleService.create(createSaleDto);
  }

  @Get()
  findAll(): Promise<SaleResponse[]> {
    return this.saleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<SaleResponse> {
    return this.saleService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSaleDto: UpdateSaleDto,
  ): Promise<ApiResponse<null>> {
    return this.saleService.update(id, updateSaleDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<ApiResponse<null>> {
    return this.saleService.remove(id);
  }
}
