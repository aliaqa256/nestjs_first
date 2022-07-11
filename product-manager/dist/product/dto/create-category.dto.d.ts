import { Category } from '../schemas/category.schema';
export declare class CreateProductDto {
    readonly category_name: string;
    readonly parent: Category;
    readonly is_parent: boolean;
}
