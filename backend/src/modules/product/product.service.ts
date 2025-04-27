import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared';
import { Product } from '@prisma/client';
import { NotFoundError } from 'src/shared';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(): Promise<Product[]> {
    return this.prismaService.product.findMany();
  }

  async getById(id: string): Promise<Product | null> {
    const product = await this.prismaService.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundError('Product');
    }

    return product;
  }

  async create(data: Product): Promise<Product> {
    return this.prismaService.product.create({
      data,
    });
  }

  async update(id: string, data: Partial<Product>): Promise<Product> {
    return this.prismaService.product.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Product> {
    return this.prismaService.product.delete({
      where: { id },
    });
  }
}
