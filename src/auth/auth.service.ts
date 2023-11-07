import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { AuthLoginDto } from './dto/auth-login.dto';
import { Admin } from '../admin/admin.entity';
import { hashPwd } from '../utils/hash-pwd';
import { JwtPayload } from './jwt.strategy';
import { v4 as uuid } from 'uuid';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private createToken(currentTokenId: string): {
    accessToken: string;
    expiresIn: number;
  } {
    const payload: JwtPayload = { id: currentTokenId };
    const expiresIn = 60 * 60 * 24;
    const accessToken = sign(
      payload,
      'asdoasjd90*)80A9AN09v09A**)9v94vvov093v809v08v09*)*VN8asda9a438av89a8eva987avn9**&*649(&b987a',
      { expiresIn },
    );
    return {
      accessToken,
      expiresIn,
    };
  }

  private async generateToken(admin: Admin): Promise<string> {
    let token;
    let userWithThisToken = null;
    do {
      token = uuid();
      userWithThisToken = await Admin.findOne({
        where: { currTokenId: token },
      });
    } while (!!userWithThisToken);
    admin.currTokenId = token;
    await admin.save();

    return token;
  }
  async login(req: AuthLoginDto, res: Response): Promise<any> {
    try {
      const admin = await Admin.findOne({
        where: {
          login: req.login,
          pwdHash: hashPwd(req.pwd),
        },
      });

      if (!admin) {
        return res.json({ error: 'Invalid login data!' });
      }

      const token = await this.createToken(await this.generateToken(admin));

      return res
        .cookie('jwt', token.accessToken, {
          secure: false,
          domain: 'localhost',
          httpOnly: true,
        })
        .json({ ok: true });
    } catch (e) {
      return res.json({ error: e.message });
    }
  }
  async logout(admin: Admin, res: Response) {
    try {
      console.log(admin);
      admin.currTokenId = "asdsad";
      await admin.save();
      res.clearCookie('jwt', {
        secure: false,
        domain: 'localhost',
        httpOnly: true,
      });
      return res.json({ ok: true });
    } catch (e) {
      return res.json({ error: e.message });
    }
  }
}
