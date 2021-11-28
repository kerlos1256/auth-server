import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, StrategyOptions } from 'passport-google-oauth20';
import { GoogleConstants } from 'src/constants';
import { AuthService } from '../auth.service';

const opts: StrategyOptions = {
  clientID: GoogleConstants.clientId,
  clientSecret: GoogleConstants.clientSecret,
  callbackURL: GoogleConstants.callbackURL,
  scope: ['email', 'profile'],
};

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super(opts);
  }

  async validate(access_token, refresh_token, profile: Profile) {
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
