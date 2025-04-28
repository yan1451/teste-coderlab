import { ProductService } from './product.service';
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { Product } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(@Query() params: any): Promise<Product[]> {
    return this.productService.getAll(params);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.productService.getById(id);
  }

  @Post()
  create(@Body() product: CreateProductDto) {
    return this.productService.create(product);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateData: UpdateProductDto) {
    return this.productService.update(id, updateData);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
