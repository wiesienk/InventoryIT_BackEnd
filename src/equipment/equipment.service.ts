import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { Equipment } from './entities/equipment.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class EquipmentService {
  constructor(
    @Inject(forwardRef(() => UserService)) private userService: UserService,
  ) {}
  async create(createEquipmentDto: CreateEquipmentDto) {
    const user = await this.userService.findOne(createEquipmentDto.userID);
    const newEquipment = new Equipment();
    newEquipment.name = createEquipmentDto.name;
    newEquipment.type = createEquipmentDto.type;
    newEquipment.user = user;
    newEquipment.serialNumber = createEquipmentDto.serialNumber;
    await newEquipment.save();
    return newEquipment.id;
  }

  async findAll() {
    const data = await Equipment.find({
      relations: ['user'],
    });
    const result = data.map((item) => {
      return {
        id: item.id,
        type: item.type,
        name: item.name,
        userLastName: item.user.lastName,
        serialNumber: item.serialNumber,
      };
    });
    return result;
  }

  async findOne(id: string) {
    return await Equipment.findOne({ where: { id }, relations: ['user'] });
  }

  async update(id: string, updateEquipmentDto: UpdateEquipmentDto) {
    const equipToChange = await Equipment.findOne({
      where: { id },
      relations: ['user'],
    });
    const userToChange = await this.userService.findOne(
      updateEquipmentDto.userID,
    );
    equipToChange.name = updateEquipmentDto.name;
    equipToChange.type = updateEquipmentDto.type;
    equipToChange.serialNumber = updateEquipmentDto.serialNumber;
    equipToChange.user = userToChange;
    await equipToChange.save();
    return `This action updates a #${id} equipment`;
  }

  async remove(id: string) {
    const equipToRemove = await Equipment.findOne({
      where: { id },
      relations: ['user'],
    });
    await equipToRemove.remove();
    return `This action removes a #${id} equipment`;
  }
}
