import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByUsername(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
      include: {
        interests: {
          include: {
            category: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      username: user.username,
      displayName: user.displayName,
      avatarUrl: user.avatarUrl,
      interests: user.interests.map((ui) => ui.category),
    };
  }

  async updateCurrentUserInterests(userId: string, categoryIds: string[]) {
    // Replace all existing interests with the new set
    await this.prisma.$transaction([
      this.prisma.userInterest.deleteMany({
        where: { userId },
      }),
      this.prisma.userInterest.createMany({
        data: categoryIds.map((categoryId) => ({
          userId,
          categoryId,
        })),
        skipDuplicates: true,
      }),
    ]);
  }
}

