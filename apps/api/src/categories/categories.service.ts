import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const categories = await this.prisma.category.findMany({
      orderBy: { groupName: 'asc' },
    });

    return categories.reduce((groups, category) => {
      const group = category.groupName;
      if (!groups[group]) groups[group] = [];
      groups[group].push(category);
      return groups;
    }, {});
  }
}
