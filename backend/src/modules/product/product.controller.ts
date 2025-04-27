import { ProductService } from './product.service';
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Product } from '@prisma/client';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(): Promise<Product[]> {
    return this.productService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.getById(id);
  }

  @Post()
  create(@Body() product: any) {
    return this.productService.create(product);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateData: Partial<Product>) {
    return this.productService.update(id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
