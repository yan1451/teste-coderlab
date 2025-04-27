import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(page: number = 1, pageSize: number = 10): Promise<Category[]> {
    return await this.prismaService.category.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        parent: true,
        children: true,
      },
    });
  }
}
