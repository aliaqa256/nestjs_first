import { IsEmail, IsNotEmpty } from 'class-validator';
import { Category } from '../../category/schemas/category.schema';

export class CreateProductDto {
  @IsNotEmpty()
  readonly name: string;
  readonly price: number;
  details: Record<string, any>;
  readonly image: string;
  readonly category: Category;
}
