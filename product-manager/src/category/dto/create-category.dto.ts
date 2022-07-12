import { Category } from '../schemas/category.schema';
import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateCategoryDto {
  @IsNotEmpty()
  readonly category_name: string;
  readonly parent: Category;
  readonly is_parent: boolean;
}
