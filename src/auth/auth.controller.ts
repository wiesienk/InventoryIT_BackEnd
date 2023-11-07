import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthGuard } from '@nestjs/passport';
import { AdminObj } from '../decorators/admin-obj.decorators';
import { Admin } from '../admin/admin.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async phoneRegister(
    @Body() req: AuthLoginDto,
    @Res() res: Response,
  ): Promise<any> {
    return this.authService.login(req, res);
  }
  @Get('logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@AdminObj() admin: Admin, @Res() res: Response) {
    return this.authService.logout(admin, res);
  }
}
