import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-twitter';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
  constructor(private prisma: PrismaService) {
    super({
      consumerKey: process.env.TWITTER_CLIENT_ID,
      consumerSecret: process.env.TWITTER_CLIENT_SECRET,
      callbackURL: process.env.TWITTER_CALLBACK_URL,
      includeEmail: false,
    });
  }

  async validate(token: string, tokenSecret: string, profile: any) {
    const user = await this.prisma.user.upsert({
      where: { twitterId: profile.id },
      update: {
        displayName: profile.displayName,
        avatarUrl: profile.photos?.[0]?.value ?? null,
      },
      create: {
        twitterId: profile.id,
        username: profile.username,
        displayName: profile.displayName,
        avatarUrl: profile.photos?.[0]?.value ?? null,
      },
    });

    return user;
  }
}
