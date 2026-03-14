import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async upsertUserFromTwitterProfile(profile: {
    id: string;
    username: string;
    displayName: string;
    avatarUrl?: string | null;
  }) {
    const user = await this.prisma.user.upsert({
      where: { twitterId: profile.id },
      update: {
        username: profile.username,
        displayName: profile.displayName,
        avatarUrl: profile.avatarUrl ?? null,
      },
      create: {
        twitterId: profile.id,
        username: profile.username,
        displayName: profile.displayName,
        avatarUrl: profile.avatarUrl ?? null,
      },
    });

    return user;
  }

  async generateJwt(user: { id: string; username: string }) {
    const payload = { sub: user.id, username: user.username };
    return this.jwtService.signAsync(payload);
  }
}

