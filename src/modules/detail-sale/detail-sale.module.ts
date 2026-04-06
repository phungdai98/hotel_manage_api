import { Module } from '@nestjs/common';
import { DetailSaleService } from './detail-sale.service';
import { DetailSaleController } from './detail-sale.controller';

@Module({
  controllers: [DetailSaleController],
  providers: [DetailSaleService],
})
export class DetailSaleModule {}
