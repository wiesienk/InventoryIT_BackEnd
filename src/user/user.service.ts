import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {
  async getAllUsers() {
    return await User.find();
  }
}
