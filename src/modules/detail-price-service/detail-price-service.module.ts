import { Module } from '@nestjs/common';
import { DetailPriceServiceService } from './detail-price-service.service';
import { DetailPriceServiceController } from './detail-price-service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailPriceService } from 'src/model';

@Module({
  imports: [TypeOrmModule.forFeature([DetailPriceService])],
  controllers: [DetailPriceServiceController],
  providers: [DetailPriceServiceService],
})
export class DetailPriceServiceModule {}
