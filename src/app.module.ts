import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import {
  Bill,
  Customer,
  DetailBill,
  DetailCustomerAt,
  DetailOrderTicket,
  DetailPriceRoom,
  DetailPriceService,
  DetailSale,
  DetailService,
  DetailStatus,
  KindRoom,
  OrderTicket,
  Part,
  RankRoom,
  Rent,
  RentTicket,
  Room,
  Sale,
  Service,
  StatusRoom,
  TypeRoom,
  User,
} from './model';
import { TypeRoomModule } from './modules/type-room/type-room.module';
import { KindRoomModule } from './modules/kind-room/kind-room.module';
import { RankRoomModule } from './modules/rank-room/rank-room.module';
import { BillModule } from './modules/bill/bill.module';
import { CustomerModule } from './modules/customer/customer.module';
import { DetailCustomerAtModule } from './modules/detail-customer-at/detail-customer-at.module';
import { DetailOrderTicketModule } from './modules/detail-order-ticket/detail-order-ticket.module';
import { DetailPriceRoomModule } from './modules/detail-price-room/detail-price-room.module';
import { DetailPriceServiceModule } from './modules/detail-price-service/detail-price-service.module';
import { DetailSaleModule } from './modules/detail-sale/detail-sale.module';
import { DetailServiceModule } from './modules/detail-service/detail-service.module';
import { DetailStatusModule } from './modules/detail-status/detail-status.module';
import { OrderTicketModule } from './modules/order-ticket/order-ticket.module';
import { PartModule } from './modules/part/part.module';
import { RentModule } from './modules/rent/rent.module';
import { RentTicketModule } from './modules/rent-ticket/rent-ticket.module';
import { RoomModule } from './modules/room/room.module';
import { SaleModule } from './modules/sale/sale.module';
import { ServiceHotelModule } from './modules/service-hotel/service-hotel.module';
import { StatusRoomModule } from './modules/status-room/status-room.module';
import { OrderModule } from './modules/order/order.module';

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
      Bill,
      Customer,
      DetailBill,
      DetailCustomerAt,
      DetailOrderTicket,
      DetailPriceRoom,
      DetailPriceService,
      DetailSale,
      DetailService,
      DetailStatus,
      KindRoom,
      OrderTicket,
      Part,
      RankRoom,
      Rent,
      RentTicket,
      Room,
      Sale,
      Service,
      StatusRoom,
      TypeRoom,
      User,
    ]),
    AuthModule,
    UsersModule,
    TypeRoomModule,
    KindRoomModule,
    RankRoomModule,
    BillModule,
    CustomerModule,
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
    ServiceHotelModule,
    StatusRoomModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
