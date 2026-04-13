import { Module } from '@nestjs/common';
import { DetailCustomerAtService } from './detail-customer-at.service';
import { DetailCustomerAtController } from './detail-customer-at.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailCustomerAt } from 'src/model';

@Module({
  imports: [TypeOrmModule.forFeature([DetailCustomerAt])],
  controllers: [DetailCustomerAtController],
  providers: [DetailCustomerAtService],
})
export class DetailCustomerAtModule {}
