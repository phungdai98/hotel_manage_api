import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Part, User } from '../../model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponse } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Part)
        private partRepository: Repository<Part>,
    ) {}

    async findOne(email: string): Promise<UserResponse | null> {
        try {
            const user = await this.userRepository.findOne({ where: { email }, relations: ['part'] });
            if (!user) {
                return null;
            }
            return new UserResponse(user);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async findOneWithPassword(email: string): Promise<User | null> {
        try {
            const user = await this.userRepository.findOne({ where: { email } });
            return user || null;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async findAll(): Promise<UserResponse[] | null> {
        try {
            const users = await this.userRepository.find();
            if (!users) {
                return null;
            }
            return users.map((user) => new UserResponse(user));
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async create(createUserDto: CreateUserDto): Promise<UserResponse | null> {
        try {
            const part = await this.partRepository.existsBy({ id: createUserDto.partId });
            if (!part) {
                throw new BadRequestException(`Phòng ban (ID: ${createUserDto.partId}) không tồn tại trong hệ thống!`);
            }
            const user = this.userRepository.create(createUserDto);
            const savedUser = await this.userRepository.save(user);
            return new UserResponse(savedUser);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async update(email: string, updateUserDto: UpdateUserDto): Promise<UserResponse | null> {
        try {
            const user = await this.userRepository.findOne({ where: { email } });
            if (!user) {
                throw new BadRequestException(`Người dùng (Email: ${email}) không tồn tại trong hệ thống!`);
            }
            if (updateUserDto.partId) {
                const part = await this.partRepository.existsBy({ id: updateUserDto.partId });
                if (!part) {
                    throw new BadRequestException(`Phòng ban (ID: ${updateUserDto.partId}) không tồn tại trong hệ thống!`);
                }
            }
            user.name = updateUserDto.name || user.name;
            user.email = updateUserDto.email || user.email;
            user.password = updateUserDto.password || user.password;
            user.idCard = updateUserDto.idCard || user.idCard;
            user.phone = updateUserDto.phone || user.phone;
            user.address = updateUserDto.address || user.address;
            user.role = updateUserDto.role || user.role;
            user.partId = updateUserDto.partId || user.partId;
            const updatedUser = await this.userRepository.save(user);
            return new UserResponse(updatedUser);
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}
