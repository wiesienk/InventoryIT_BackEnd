import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AddUserDto } from './dto/add-user.dto';
import { AddUserResponse, UsersIdAndLastnameResponse } from '../types';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(@Inject(UserService) private userService: UserService) {}

  @Get('/')
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }
  @Get('/usersid')
  getIdAndLastname() {
    return this.userService.getData();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
  @Post('/')
  addUser(@Body() newUser: AddUserDto): Promise<AddUserResponse> {
    return this.userService.addUser(newUser);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.removeUser(id);
  }
}
