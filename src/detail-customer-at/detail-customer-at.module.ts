import { Module } from '@nestjs/common';
import { DetailCustomerAtService } from './detail-customer-at.service';
import { DetailCustomerAtController } from './detail-customer-at.controller';

@Module({
  controllers: [DetailCustomerAtController],
  providers: [DetailCustomerAtService],
})
export class DetailCustomerAtModule {}
