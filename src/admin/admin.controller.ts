import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AddAdminDto } from './dto/add-admin.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/')
  @UseGuards(AuthGuard('jwt'))
  addAdmin(@Body() newAdmin: AddAdminDto) {
    return this.adminService.addAdmin(newAdmin);
  }
}
