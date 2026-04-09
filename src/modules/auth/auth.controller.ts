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
    async signIn(@Body() signInDto: RequestLogin) {
        try {
            const result = await this.authenService.signIn(signInDto.username, signInDto.password);
            return result;
        } catch (error) {
            return error;
        }
    }
}
