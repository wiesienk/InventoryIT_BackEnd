import {Body, Controller, Delete, Get, Inject, Param, Patch, Post} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AddUserDto } from './dto/add-user.dto';
import { AddUserResponse } from '../types';
import {UpdateEquipmentDto} from "../equipment/dto/update-equipment.dto";
import {UpdateUserDto} from "./dto/update-user.dto";

@Controller('user')
export class UserController {
  constructor(@Inject(UserService) private userService: UserService) {}

  @Get('/')
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
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
