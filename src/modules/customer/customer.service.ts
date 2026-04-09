import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/model';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { CustomerResponse } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}
  async create(createCustomerDto: CreateCustomerDto) {
    try {
      const result = await this.customerRepository.save(createCustomerDto);
      return result;
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    try {
      const result = await this.customerRepository.update(id, updateCustomerDto);
      if (!result) {
        throw new NotFoundException('Customer not found');
      }
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: string): Promise<string> {
    try {
      const result = await this.customerRepository.delete(id);
      if (!result) {
        throw new NotFoundException('Customer not found');
      }
      return id;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
