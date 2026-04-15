import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorResponseWithStatusCode } from 'src/common/entities/errorEntity';
import { Customer } from 'src/model';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerResponse } from './entities/customer.entity';
import { ApiResponse } from 'src/common/entities/typeResponse';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}
  async create(createCustomerDto: CreateCustomerDto): Promise<ApiResponse<null>> {
    try {
      const customer = this.customerRepository.create(createCustomerDto);
      await this.customerRepository.save(customer);
      return new ApiResponse(true, null, 'Customer created successfully', 201);
    } catch (error: ErrorResponseWithStatusCode) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(page: number, limit: number, search: string) {
    try {
      const where: FindOptionsWhere<Customer> = {};
      if (search) {
        where.name = Like(`%${search}%`);
      }
      const result = await this.customerRepository.find({
        skip: (page - 1) * limit,
        take: limit,
        where: where,
      });
      return result.map((customer) => new CustomerResponse(customer));
    } catch (error: ErrorResponseWithStatusCode) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: string): Promise<CustomerResponse> {
    try {
      const result = await this.customerRepository.findOne({ where: { id: id } });
      if (!result) {
        throw new NotFoundException('Customer not found');
      }
      return new CustomerResponse(result);
    } catch (error: ErrorResponseWithStatusCode) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<ApiResponse<null>> {
    try {
      const result = await this.customerRepository.update(id, updateCustomerDto);
      if (!result) {
        throw new NotFoundException('Customer not found');
      }
      return new ApiResponse(true, null, 'Customer updated successfully', 200);
    } catch (error: ErrorResponseWithStatusCode) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: string): Promise<ApiResponse<null>> {
    try {
      const result = await this.customerRepository.delete(id);
      if (!result) {
        throw new NotFoundException('Customer not found');
      }
      return new ApiResponse(true, null, 'Customer deleted successfully', 200);
    } catch (error: ErrorResponseWithStatusCode) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
