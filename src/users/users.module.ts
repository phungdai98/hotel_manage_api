import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User, Part } from '../model';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Part])],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UserController]
})
export class UsersModule { }
