import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { AddUserDto } from './dto/add-user.dto';
import { AddUserResponse, UsersIdAndLastnameResponse } from '../types';
import { UpdateUserDto } from './dto/update-user.dto';
import { EquipmentService } from '../equipment/equipment.service';
import { Equipment } from '../equipment/entities/equipment.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => EquipmentService))
    private equipmentService: EquipmentService,
  ) {}
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
    const userEquipment = await Equipment.find({
      where: { user: { id: id } },
      relations: ['user'],
    });

    await Promise.all(
      userEquipment.map(async (item) => {
        await this.equipmentService.update(item.id, {
          name: item.name,
          type: item.type,
          serialNumber: item.serialNumber,
          userID: '85b28913-2a1d-4b80-99d0-686f72d6d4eb',
        });
      }),
    );

    const userToDelete = await User.findOne({ where: { id } });
    if (userToDelete) {
      await userToDelete.remove();
      return `Usunięto użytkownika o id: ${id}`;
    } else {
      throw new Error(`Nie znaleziono użytkownika o id: ${id}`);
    }
  }

  async getData(): Promise<UsersIdAndLastnameResponse[]> {
    const users = await User.find();
    const result = users.map((item) => {
      return { id: item.id, lastName: item.lastName };
    });
    return result;
  }
}
