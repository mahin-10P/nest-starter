import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UsePipes,
    UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Auth } from './auth.decorator';
import { User } from '../model/user.entity';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Post('login')
    async loginUsers(@Body() createUserDto : User) {
        return this.authService.loginUser(createUserDto);
    }

    @Get('me')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    me(@Auth() user: User): User {
        return user;
    }

}
