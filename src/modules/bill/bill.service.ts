import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponse } from 'src/common/entities/typeResponse';
import { Bill, DetailStatus, Rent, RentTicket } from 'src/model';
import { FindOptionsWhere, In, Like, Repository, DataSource } from 'typeorm';
import { CreateBillAndUpdateRentDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { BillResponse } from './entities/bill.entity';
import { RentService } from '../rent/rent.service';
import { RentCalculatePriceResponse } from '../rent/entities/rent.entity';
import { StatusRoomEnum } from 'src/common/enums/statusRoomEnum';

@Injectable()
export class BillService {
  constructor(
    @InjectRepository(Bill)
    private billRepository: Repository<Bill>,
    private readonly dataSource: DataSource,
    private readonly rentService: RentService
  ) { }

  async create(createBillDto: CreateBillAndUpdateRentDto, userId: string): Promise<BillResponse> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const checkRentTicket = await this.dataSource.getRepository(RentTicket).findOne({
        where: { code: createBillDto.codeTicketId },
      });
      if (!checkRentTicket) {
        throw new NotFoundException('Rent ticket not found');
      }
      const rents: RentCalculatePriceResponse[] = await this.rentService.getPriceByCodeRentTicket({ codeRentTicket: createBillDto.codeTicketId, checkIn: createBillDto.checkIn, checkOut: createBillDto.checkOut });
      const rentsCalc: RentCalculatePriceResponse[] = rents.filter((rent) => createBillDto.rents.includes(rent.id));
      const totalPriceRoom: number = rentsCalc.reduce((acc: number, rent: RentCalculatePriceResponse) => acc + rent.totalPriceRoom, 0);
      const totalPriceService: number = rentsCalc.reduce((acc: number, rent: RentCalculatePriceResponse) => acc + rent.totalPriceService, 0);
      const totalPrice: number = totalPriceRoom + totalPriceService;
      const billCreate = queryRunner.manager.create(Bill, {
        description: createBillDto.description,
        rentTicketId: checkRentTicket.id,
        userId: userId,
        totalPrice: totalPrice,
        priceRoom: totalPriceRoom,
        priceService: totalPriceService,
      })
      const result: Bill = await queryRunner.manager.save(billCreate);
      await queryRunner.manager.update(
        Rent,
        { id: In(createBillDto.rents) },
        { billId: result.id, isPayed: true }
      );
      await queryRunner.manager.update(
        DetailStatus,
        {
          roomId: In(rentsCalc.map(rent => rent.roomId)),
          status: StatusRoomEnum.OCCUPIED,
        },
        { status: StatusRoomEnum.CHECKED_OUT }
      );
      await queryRunner.commitTransaction();
      return new BillResponse(result);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException((error as Error).message);
    }
    finally {
      await queryRunner.release();
    }
  }

  async findAll(
    page: number,
    limit: number,
    search: string,
  ): Promise<BillResponse[]> {
    try {
      const where: FindOptionsWhere<Bill> = {};
      if (search) {
        where.description = Like(`%${search}%`);
      }
      const result = await this.billRepository.find({
        skip: (page - 1) * limit,
        take: limit,
        where: where,
      });
      return result.map((bill) => new BillResponse(bill));
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async findOne(id: string): Promise<BillResponse> {
    try {
      const result = await this.billRepository.findOne({ where: { id: id } });
      if (!result) {
        throw new NotFoundException('Bill not found');
      }
      return new BillResponse(result);
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async update(
    id: string,
    updateBillDto: UpdateBillDto,
  ): Promise<ApiResponse<null>> {
    try {
      const result = await this.billRepository.update(id, updateBillDto);
      if (!result) {
        throw new NotFoundException('Bill not found');
      }
      return new ApiResponse(true, null, 'Bill updated successfully', 200);
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async remove(id: string): Promise<ApiResponse<null>> {
    try {
      const result = await this.billRepository.delete(id);
      if (!result) {
        throw new NotFoundException('Bill not found');
      }
      return new ApiResponse(true, null, 'Bill deleted successfully', 200);
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }
}
