import { Category } from '../schemas/category.schema';

export class CreateCategoryDto {
    readonly category_name: string;
    readonly parent: Category;
    readonly is_parent: boolean;
}
