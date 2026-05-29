import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponse } from 'src/common/entities/typeResponse';
import { Customer } from 'src/model';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerResponse } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}
  async create(
    createCustomerDto: CreateCustomerDto,
  ): Promise<CustomerResponse> {
    try {
      const customer = this.customerRepository.create(createCustomerDto);
      const savedCustomer = await this.customerRepository.save(customer);
      return new CustomerResponse(savedCustomer);
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
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
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async findOne(id: string): Promise<CustomerResponse> {
    try {
      const result = await this.customerRepository.findOne({
        where: { id: id },
      });
      if (!result) {
        throw new NotFoundException('Customer not found');
      }
      return new CustomerResponse(result);
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async findOneByIdCard(idCard: string): Promise<CustomerResponse> {
    try {
      const result = await this.customerRepository.findOne({
        where: { idCard: idCard },
      });
      if (!result) {
        throw new NotFoundException('Customer not found');
      }
      return new CustomerResponse(result);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // giữ nguyên 404
      }

      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<ApiResponse<null>> {
    try {
      const result = await this.customerRepository.update(
        id,
        updateCustomerDto,
      );
      if (!result) {
        throw new NotFoundException('Customer not found');
      }
      return new ApiResponse(true, null, 'Customer updated successfully', 200);
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async remove(id: string): Promise<ApiResponse<null>> {
    try {
      const result = await this.customerRepository.delete(id);
      if (!result) {
        throw new NotFoundException('Customer not found');
      }
      return new ApiResponse(true, null, 'Customer deleted successfully', 200);
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }
}
