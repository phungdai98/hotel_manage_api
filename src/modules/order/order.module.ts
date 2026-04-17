import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderTicket } from 'src/model';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OrderTicket])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
