import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { RequestLogin, RequestRefresh } from './entities/auth.entity';

@Controller('auth')
export class AuthController {
  constructor(private authenService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  async signIn(@Body() signInDto: RequestLogin) {
    try {
      return await this.authenService.signIn(
        signInDto.username,
        signInDto.password,
      );
    } catch (error) {
      throw new UnauthorizedException((error as Error)?.message);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('refresh')
  async refresh(@Body() data: RequestRefresh) {
    if (!data.refreshToken) {
      throw new UnauthorizedException('Thiếu refresh token');
    }
    return this.authenService.refresh(data.refreshToken);
  }
}
