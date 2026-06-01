import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserAuthResponse } from './entities/auth.entity';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  private generateTokens(payload: UserAuthResponse) {
    const accessToken = this.jwtService.sign(payload, {
      secret: jwtConstants.secret,
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: jwtConstants.secretRefresh,
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  async signIn(email: string, pass: string) {
    const user = await this.userService.findOneWithPassword(email);
    if (!user || user.password !== pass) {
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

    return {
      ...this.generateTokens(payload),
      email: user.email,
      role: user.role,
      phone: user.phone,
    };
  }

  async refresh(refreshToken: string) {
    try {
      // Verify refresh token bằng secretRefresh
      const payload = this.jwtService.verify<UserAuthResponse>(refreshToken, {
        secret: jwtConstants.secretRefresh,
      });

      // Tạo lại payload sạch (bỏ các field JWT như iat, exp)
      const newPayload: UserAuthResponse = {
        email: payload.email,
        sub: payload.sub,
        userId: payload.userId,
        role: payload.role,
      };

      // Cấp token mới
      return this.generateTokens(newPayload);
    } catch {
      throw new UnauthorizedException('Refresh token không hợp lệ hoặc đã hết hạn');
    }
  }
}
