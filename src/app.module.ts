import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Bill, Customer, DetailBill, DetailCustomerAt, DetailOrderTicket, DetailPriceRoom, DetailPriceService, DetailSale, DetailService, DetailStatus, KindRoom, OrderTicket, Part, RankRoom, Rent, RentTicket, Room, Sale, Service, StatusRoom, TypeRoom, User } from './model';
import { TypeRoomModule } from './type-room/type-room.module';
import { KindRoomModule } from './kind-room/kind-room.module';
import { RankRoomModule } from './rank-room/rank-room.module';
import { BillModule } from './bill/bill.module';
import { CustomerModule } from './customer/customer.module';
import { DetailBillModule } from './detail-bill/detail-bill.module';
import { DetailCustomerAtModule } from './detail-customer-at/detail-customer-at.module';
import { DetailOrderTicketModule } from './detail-order-ticket/detail-order-ticket.module';
import { DetailPriceRoomModule } from './detail-price-room/detail-price-room.module';
import { DetailPriceServiceModule } from './detail-price-service/detail-price-service.module';
import { DetailSaleModule } from './detail-sale/detail-sale.module';
import { DetailServiceModule } from './detail-service/detail-service.module';
import { DetailStatusModule } from './detail-status/detail-status.module';
import { OrderTicketModule } from './order-ticket/order-ticket.module';
import { PartModule } from './part/part.module';
import { RentModule } from './rent/rent.module';
import { RentTicketModule } from './rent-ticket/rent-ticket.module';
import { RoomModule } from './room/room.module';
import { SaleModule } from './sale/sale.module';
import { ServiceModule } from './service/service.module';
import { StatusRoomModule } from './status-room/status-room.module';
import { ServiceHotelModule } from './service-hotel/service-hotel.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConfigModule.forRoot(),
     TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS, // Biến này lấy từ file .env
      database: process.env.DB_NAME,
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: false, // Lưu ý: Chỉ bật true khi dev (tự động tạo bảng)
    }),
    TypeOrmModule.forFeature([
      Bill, Customer, DetailBill, DetailCustomerAt, DetailOrderTicket, DetailPriceRoom, DetailPriceService, DetailSale, DetailService, DetailStatus, KindRoom, OrderTicket, Part, RankRoom, Rent, RentTicket, Room, Sale, Service, StatusRoom, TypeRoom, User
    ]),
    AuthModule,
    UsersModule,
    TypeRoomModule,
    KindRoomModule,
    RankRoomModule,
    BillModule,
    CustomerModule,
    DetailBillModule,
    DetailCustomerAtModule,
    DetailOrderTicketModule,
    DetailPriceRoomModule,
    DetailPriceServiceModule,
    DetailSaleModule,
    DetailServiceModule,
    DetailStatusModule,
    OrderTicketModule,
    PartModule,
    RentModule,
    RentTicketModule,
    RoomModule,
    SaleModule,
    ServiceModule,
    StatusRoomModule,
    ServiceHotelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
