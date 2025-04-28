import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsOptional()
  qty: number;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsString()
  @IsOptional()
  photo: string;

  @IsNotEmpty()
  @IsArray()
  @Type(() => Object)
  categories: string[];

  @IsOptional()
  @IsDate()
  createdAt: Date;

  @IsOptional()
  @IsDate()
  updatedAt: Date;

  constructor(partial: Partial<CreateProductDto>) {
    Object.assign(this, partial);
  }
}
