import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByUsername(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
      include: {
        interests: {
          include: { category: true },
        },
      },
    });

    if (!user) throw new NotFoundException('User not registered yet');

    return {
      username: user.username,
      displayedName: user.displayName,
      avatarUrl: user.avatarUrl,
      interests: user.interests.map((i) => i.category),
    };
  }

  async updateInterests(userId: string, categoryIds: string[]) {
    await this.prisma.$transaction([
      this.prisma.userInterests.deleteMany({ where: { userId } }),
      this.prisma.userInterests.createMany({
        data: categoryIds.map((categoryId) => ({ userId, categoryId })),
      }),
    ]);

    return this.findByUsername(userId);
  }
}
