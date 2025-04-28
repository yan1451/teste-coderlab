import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared';
import { Product } from '@prisma/client';
import { NotFoundError, ConflictException } from 'src/shared';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(params?: any): Promise<Product[]> {
    let name: string = '';
    let page: number = 1;
    let pageSize: number = 10;
    if (params['name']) {
      name = params['name'];
    }
    if (params['page']) {
      page = parseInt(params['page']);
    }
    if (params['pageSize']) {
      pageSize = parseInt(params['pageSize']);
    }

    return this.prismaService.product.findMany({
      where: name
        ? { name: { contains: name, mode: 'insensitive' } }
        : undefined,
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        categories: true,
      },
    });
  }

  async getById(id: string): Promise<Product | null> {
    const product = await this.prismaService.product.findUnique({
      where: { id },
      include: {
        categories: true,
      },
    });

    if (!product) {
      throw new NotFoundError('Product');
    }

    return product;
  }

  async create(data: CreateProductDto): Promise<Product> {
    const { categories, ...productData } = data;
    const existingProduct = await this.prismaService.product.findFirst({
      where: { name: data.name },
    });

    if (existingProduct) {
      throw new ConflictException(data.name);
    }

    return this.prismaService.product.create({
      data: {
        ...productData,
        categories: {
          connect: Array.isArray(categories)
            ? categories.map((category: any) => ({ id: category.id }))
            : [],
        },
      },
    });
  }

  async update(id: string, data: UpdateProductDto): Promise<Product> {
    const { categories, ...productData } = data;
    console.log(categories);
    const existingProduct = await this.prismaService.product.findUnique({
      where: { id },
      include: { categories: true },
    });
    console.log(existingProduct);
    if (!existingProduct) {
      throw new NotFoundError('Product');
    }

    return this.prismaService.product.update({
      where: { id },
      data: {
        ...productData,
        categories: {
          connect: Array.isArray(categories)
            ? categories.map((category: any) => ({ id: category.id }))
            : [],
          disconnect: Array.isArray(categories)
            ? existingProduct.categories
                .filter(
                  (category) =>
                    !categories.some((cat: any) => cat.id === category.id),
                ) // Compara com o campo 'iD'
                .map((category) => ({ id: category.id })) // Mapeia para o formato correto
            : [], //
        },
      },
    });
  }

  async delete(id: string): Promise<Product> {
    return this.prismaService.product.delete({
      where: { id },
    });
  }
}
