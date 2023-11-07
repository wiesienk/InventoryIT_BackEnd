import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Admin } from '../admin/admin.entity';

export interface JwtPayload {
  id: string;
}

function cookieExtractor(req: any): null | string {
  return req && req.cookies ? req.cookies?.jwt ?? null : null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey:
        'asdoasjd90*)80A9AN09v09A**)9v94vvov093v809v08v09*)*VN8asda9a438av89a8eva987avn9**&*649(&b987a',
    });
  }

  async validate(payload: JwtPayload, done: (error, user) => void) {
    if (!payload || !payload.id) {
      return done(new UnauthorizedException(), false);
    }

    const user = await Admin.findOne({ where: { currTokenId: payload.id } });
    if (!user) {
      return done(new UnauthorizedException(), false);
    }

    done(null, user);
  }
}
