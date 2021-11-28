import { Strategy, IStrategyOptionsWithRequest } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Profile } from 'src/profile/entities/profile.entity';

const opts: IStrategyOptionsWithRequest = {
  usernameField: 'email',
  passReqToCallback: true,
};

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super(opts);
  }

  async validate(req, email: string, password: string): Promise<any> {
    const user: Profile = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('wrong email or password');
    }
    return user;
  }
}
