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
    } from '@nestjs/common';
    import { UserService } from 'src/user/user.service';
    
    @Controller('users')
    export class UserController {
      constructor(private readonly userService: UserService) {}
     
      @Get()
      getUsers() {
        return this.userService.getUsers();
      }
      
      @Get('id/:id')
      findUsersById(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findUserById(id);
      }
      
      @Post('create')
      async createUsers(@Body() createUserDto) {
        return this.userService.createUser(createUserDto);
      }

      @Post('login')
      async loginUsers(@Body() createUserDto) {
        return this.userService.loginUser(createUserDto);
      }

      @Delete('delete/:id')
      deleteUserById(@Param('id', ParseIntPipe) id: number) {
        return this.userService.deleteUserById(id);
      }
      
      @Put('edit')
      editUser(@Body() createUserDto) {
        return this.userService.editUser(createUserDto);
      }
    }