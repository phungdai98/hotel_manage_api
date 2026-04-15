import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { BaseController } from 'src/common/base.controller';
import { ApiResponse } from 'src/common/entities/typeResponse';
import { CustomerResponse } from './entities/customer.entity';

@Controller('customer')
export class CustomerController extends BaseController {
  constructor(private readonly customerService: CustomerService) {
    super();
  }

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto): Promise<ApiResponse<null>> {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string = '',
  ): Promise<CustomerResponse[]> {
    return this.customerService.findAll(page, limit, search);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<CustomerResponse> {
    return this.customerService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto): Promise<ApiResponse<null>> {
    return this.customerService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<ApiResponse<null>> {
    return this.customerService.remove(id);
  }
}
