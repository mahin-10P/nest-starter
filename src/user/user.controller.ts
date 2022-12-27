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
import { UserService } from 'src/user/user.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Auth } from '../auth/auth.decorator';

import { User } from 'src/model/user.entity';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getUsers() {
    return this.userService.getUsers();
  }

  @Get('id/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  findUsersById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findUserById(id);
  }

  @Post('create')
  async createUsers(@Body() createUserDto: User) {
    return this.userService.createUser(createUserDto);
  }



  @Delete('delete/:id')
  @UseGuards(AuthGuard('jwt'))
  deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUserById(id);
  }

  @Put('edit')
  @UseGuards(AuthGuard('jwt'))
  async editUser(@Auth() user: User, @Body() createUserDto) {
    return this.userService.editUser(createUserDto, user);
  }
}