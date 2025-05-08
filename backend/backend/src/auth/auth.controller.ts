import { Controller, Query } from '@nestjs/common';
import { loginDto, UserDto } from './user.dto';
import { AuthService } from './auth.service';
import { Post, Body, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(private readonly userService: AuthService) {}

    @Post()
    login(@Body() parameterCreateUser: UserDto): Promise<string>{
        return this.userService.login(parameterCreateUser);
    }

    @Get()
    sigin(@Query('email') email: string, @Query('senha') senha: string): Promise<loginDto>{
        return this.userService.sigin(email, senha);
    }

}
