import { Injectable } from '@nestjs/common';
import { Admin } from './admin.entity';
import { hashPwd } from '../utils/hash-pwd';
import { AddAdminDto } from './dto/add-admin.dto';

@Injectable()
export class AdminService {
  async addAdmin(newAdmin: AddAdminDto) {
    const admin = new Admin();
    admin.login = newAdmin.login;
    admin.pwdHash = hashPwd(newAdmin.pwd);
    await admin.save();
  }
}
