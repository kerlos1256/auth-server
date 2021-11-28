import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Strategy, IStrategyOption, Profile } from 'passport-twitter';
import { twitterConstants } from 'src/constants';

const opts: IStrategyOption = {
  consumerKey: twitterConstants.clientId,
  consumerSecret: twitterConstants.clientSecret,
  callbackURL: twitterConstants.calbackURL,
  includeEmail: true,
};

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super(opts);
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
