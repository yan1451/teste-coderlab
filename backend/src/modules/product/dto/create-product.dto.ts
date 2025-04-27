export class CreateProductDto {
  name: string;
  qty: number;
  price: number;
  photo: string;
  categoryIds: string[];
}
