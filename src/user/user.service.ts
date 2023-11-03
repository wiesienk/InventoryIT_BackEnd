import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { AddUserDto } from './dto/add-user.dto';
import { AddUserResponse, UsersIdAndLastnameResponse } from '../types';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  filter(user: User): AddUserResponse {
    const { id, email } = user;
    return { id, email };
  }

  async getAllUsers() {
    return await User.find();
  }

  async addUser(newUser: AddUserDto): Promise<AddUserResponse> {
    const user = new User();
    user.email = newUser.email;
    user.firstName = newUser.firstName;
    user.lastName = newUser.lastName;
    await user.save();
    return this.filter(user);
  }

  async findOne(id: string) {
    return await User.findOne({ where: { id } });
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await User.findOne({ where: { id } });
    user.email = updateUserDto.email;
    user.firstName = updateUserDto.firstName;
    user.lastName = updateUserDto.lastName;
    await user.save();
  }

  async removeUser(id: string) {
    const user = await User.findOne({ where: { id } });
    await user.remove();
  }

  async getData(): Promise<UsersIdAndLastnameResponse[]> {
    const users = await User.find();
    const result = users.map((item) => {
      return { id: item.id, lastName: item.lastName };
    });
    return result;
  }
}
