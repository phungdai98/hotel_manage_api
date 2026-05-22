import { Module } from '@nestjs/common';
import { RentService } from './rent.service';
import { RentController } from './rent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rent, DetailService, RentTicket, Room } from 'src/model';

@Module({
  imports: [TypeOrmModule.forFeature([Rent, DetailService, RentTicket, Room])],
  controllers: [RentController],
  providers: [RentService],
  exports: [RentService],
})
export class RentModule { }
