import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
// Using generic OAuth 2.0 strategy via passport for Twitter
// to avoid relying on a specific twitter-oauth2 package version.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const OAuth2Strategy = require('passport-oauth2');
import { AuthService } from '../auth.service';

@Injectable()
export class TwitterStrategy extends PassportStrategy(OAuth2Strategy, 'twitter') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      authorizationURL: 'https://twitter.com/i/oauth2/authorize',
      tokenURL: 'https://api.twitter.com/2/oauth2/token',
      clientID: configService.get<string>('TWITTER_CLIENT_ID'),
      clientSecret: configService.get<string>('TWITTER_CLIENT_SECRET'),
      callbackURL: configService.get<string>('TWITTER_CALLBACK_URL'),
      scope: ['tweet.read', 'users.read', 'offline.access'],
      state: true,
    });
  }

  // Twitter OAuth 2.0 profile shape is not strictly typed here; rely on `any`.
  async validate(
    accessToken: string,
    _refreshToken: string,
    profile: any,
    done: (error: any, user?: any) => void,
  ) {
    try {
      const twitterId = profile.id ?? profile.user_id ?? profile.sub;
      const username =
        profile.username ??
        profile.username?.username ??
        profile.displayName?.replace(/\s+/g, '').toLowerCase();

      const displayName = profile.displayName ?? username;
      const avatarUrl =
        profile.photos && profile.photos.length > 0
          ? profile.photos[0].value
          : null;

      const user = await this.authService.upsertUserFromTwitterProfile({
        id: twitterId,
        username,
        displayName,
        avatarUrl,
      });

      done(null, { id: user.id, username: user.username });
    } catch (err) {
      done(err, undefined);
    }
  }
}

