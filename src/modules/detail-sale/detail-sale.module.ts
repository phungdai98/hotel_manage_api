import { Module } from '@nestjs/common';
import { DetailSaleService } from './detail-sale.service';
import { DetailSaleController } from './detail-sale.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailSale } from 'src/model';

@Module({
  imports: [TypeOrmModule.forFeature([DetailSale])],
  controllers: [DetailSaleController],
  providers: [DetailSaleService],
})
export class DetailSaleModule {}
