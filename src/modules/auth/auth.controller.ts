import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RequestLogin } from './entities/auth.entity';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authenService: AuthService){}

    @HttpCode(HttpStatus.OK)
    @Public()
    @Post('login')
    signIn(@Body() signInDto: RequestLogin) {
        return this.authenService.signIn(signInDto.username, signInDto.password);
    }
}
