import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserAuthResponse } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string) {
    const user = await this.userService.findOneWithPassword(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException(
        'Tên đăng nhập hoặc mật khẩu không chính xác',
      );
    }
    const payload: UserAuthResponse = {
      email: user.email,
      sub: user.id,
      userId: user.id,
      role: user.role,
    };
    const { ...result } = user;
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: result,
    };
  }
}
