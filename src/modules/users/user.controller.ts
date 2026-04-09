import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { BaseController } from "src/common/base.controller";

@Controller('user')
export class UserController extends BaseController {
    constructor(private readonly userService: UsersService) {
        super();
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Put(':id')
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }

    @Get(':email')
    async findOne(@Param('email') email: string) {
        return this.userService.findOne(email);
    }

    @Get()
    async findAll() {
        return this.userService.findAll();
    }

    @Delete(':id')
    async remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.userService.remove(id);
    }
}