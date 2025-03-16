import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/user/user.service';

export interface JwtPayload {
  username: string;
  sub: string; // userId
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('jwt.secret'),
    });
  }

  async validate(payload: JwtPayload) {
    const { sub: id } = payload;
    const user = await this.usersService.findById(id);

    if (!user) {
      throw new UnauthorizedException();
    }

    return { id: user.id, username: user.username, email: user.email };
  }
}