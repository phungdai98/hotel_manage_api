import { Module } from '@nestjs/common';
import { RentTicketService } from './rent-ticket.service';
import { RentTicketController } from './rent-ticket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentTicket } from 'src/model';
import { RankRoomModule } from '../rank-room/rank-room.module';

@Module({
  imports: [TypeOrmModule.forFeature([RentTicket]), RankRoomModule],
  controllers: [RentTicketController],
  providers: [RentTicketService],
})
export class RentTicketModule { }
