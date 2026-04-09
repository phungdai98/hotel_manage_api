import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill, RentTicket } from 'src/model';

@Module({
  imports: [TypeOrmModule.forFeature([Bill, RentTicket])],
  controllers: [BillController],
  providers: [BillService],
})
export class BillModule {}
