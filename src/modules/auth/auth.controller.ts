import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { RequestLogin } from './entities/auth.entity';
@Controller('auth')
export class AuthController {
  constructor(private authenService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  async signIn(@Body() signInDto: RequestLogin) {
    try {
      const result = await this.authenService.signIn(
        signInDto.username,
        signInDto.password,
      );
      return result;
    } catch (error) {
      throw new InternalServerErrorException((error as Error)?.message);
    }
  }
}
