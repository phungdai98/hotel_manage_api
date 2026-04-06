import { Module } from '@nestjs/common';
import { DetailBillService } from './detail-bill.service';
import { DetailBillController } from './detail-bill.controller';

@Module({
  controllers: [DetailBillController],
  providers: [DetailBillService],
})
export class DetailBillModule {}
