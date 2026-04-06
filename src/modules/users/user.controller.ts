import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
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
    create(@Body() createUserDto: CreateUserDto) {
        try {
            const user = this.userService.create(createUserDto);
            if (!user) {
                return { message: 'User not found' };
            }
            return user;
        } catch (error) {
            return error;
        }
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        try {
            const user = this.userService.update(id, updateUserDto);
            if (!user) {
                return { message: 'User not found' };
            }
            return user;
        } catch (error) {
            return error;
        }
    }

    @Get(':email')
    findOne(@Param('email') email: string) {
        try {
            const user = this.userService.findOne(email);
            if (!user) {
                return { message: 'User not found' };
            }
            return user;
        } catch (error) {
            return error;
        }
    }

    @Get()
    findAll() {
        try {
            const users = this.userService.findAll();
            if (!users) {
                return { message: 'Users not found' };
            }
            return users;
        } catch (error) {
            return error;
        }
    }
}