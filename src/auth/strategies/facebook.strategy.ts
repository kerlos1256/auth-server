import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { StrategyOption, Strategy, Profile } from 'passport-facebook';
import { FBConstants } from 'src/constants';
import { AuthService } from '../auth.service';

const strategyOpts: StrategyOption = {
  clientID: FBConstants.clientId,
  clientSecret: FBConstants.clientSercret,
  callbackURL: FBConstants.callbackURL,
  profileFields: ['name', 'email'],
};

@Injectable()
export class FBStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super(strategyOpts);
  }

  async validate(
    access_token: string,
    refresh_token: string,
    profile: Profile,
  ) {
    const user = await this.authService.isUser(profile._json.email);
    if (user)
      return this.authService.login(
        {
          name: profile.name.givenName,
          id: user.id,
        },
        profile._json.email,
      );
    if (!user)
      return this.authService.register({
        name: profile.name.givenName,
        email: profile._json.email,
      });
    return null;
  }
}
