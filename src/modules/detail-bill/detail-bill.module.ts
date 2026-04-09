import { Module } from '@nestjs/common';
import { DetailBillService } from './detail-bill.service';
import { DetailBillController } from './detail-bill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailBill } from 'src/model';

@Module({
  imports: [TypeOrmModule.forFeature([DetailBill])],
  controllers: [DetailBillController],
  providers: [DetailBillService],
})
export class DetailBillModule {}
