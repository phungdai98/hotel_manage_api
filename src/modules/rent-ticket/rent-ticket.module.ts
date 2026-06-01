import { Module } from '@nestjs/common';
import { RentTicketService } from './rent-ticket.service';
import { RentTicketController } from './rent-ticket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderTicket, RentTicket } from 'src/model';
import { RankRoomModule } from '../rank-room/rank-room.module';
import { Rent } from 'src/model/rent.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RentTicket, OrderTicket, Rent]),
    RankRoomModule,
  ],
  controllers: [RentTicketController],
  providers: [RentTicketService],
})
export class RentTicketModule {}
