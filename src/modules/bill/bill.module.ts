import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill } from 'src/model';
import { RentModule } from '../rent/rent.module';
import { BillController } from './bill.controller';
import { BillService } from './bill.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bill]), RentModule],
  controllers: [BillController],
  providers: [BillService],
})
export class BillModule { }
