import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllGroupedByGroupName() {
    const categories = await this.prisma.category.findMany({
      orderBy: [{ groupName: 'asc' }, { name: 'asc' }],
    });

    return categories.reduce<Record<string, typeof categories>>(
      (acc, category) => {
        if (!acc[category.groupName]) {
          acc[category.groupName] = [];
        }
        acc[category.groupName].push(category);
        return acc;
      },
      {},
    );
  }
}

