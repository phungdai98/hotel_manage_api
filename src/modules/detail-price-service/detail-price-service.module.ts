import { Module } from '@nestjs/common';
import { DetailPriceServiceService } from './detail-price-service.service';
import { DetailPriceServiceController } from './detail-price-service.controller';

@Module({
  controllers: [DetailPriceServiceController],
  providers: [DetailPriceServiceService],
})
export class DetailPriceServiceModule {}
