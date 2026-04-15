import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { BaseController } from "src/common/base.controller";
import { UserResponse } from "./entities/user.entity";
import { ApiResponse } from "src/common/entities/typeResponse";
import { DeleteResult, UpdateResult } from "typeorm";

@Controller('user')
export class UserController extends BaseController {
    constructor(private readonly userService: UsersService) {
        super();
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<UserResponse | null> {
        return this.userService.create(createUserDto);
    }

    @Put(':id')
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto): Promise<UpdateResult | null> {
        return this.userService.update(id, updateUserDto);
    }

    @Get(':email')
    async findOne(@Param('email') email: string): Promise<UserResponse | null> {
        return this.userService.findOne(email);
    }

    @Get()
    async findAll(): Promise<UserResponse[] | null> {
        return this.userService.findAll();
    }

    @Delete(':id')
    async remove(@Param('id', ParseUUIDPipe) id: string): Promise<DeleteResult> {
        return this.userService.remove(id);
    }
}