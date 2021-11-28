import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Strategy, StrategyOptions, Profile } from 'passport-github';
import { GHConstants } from 'src/constants';

const opts: StrategyOptions = {
  clientID: GHConstants.clientId,
  clientSecret: GHConstants.clientSecret,
  callbackURL: GHConstants.callbackURL,
  scope: ['user:email', 'repo'],
};

@Injectable()
export class GHStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super(opts);
  }

  async validate(token, _, profile: any) {
    console.log(profile);
    const user = await this.authService.isUser(profile._json.email);
    if (user)
      return this.authService.login(
        {
          name: profile.displayName,
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
