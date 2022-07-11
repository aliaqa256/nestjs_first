import { Category } from "../../category/schemas/category.schema";
export declare class CreateProductDto {
    readonly name: string;
    readonly price: number;
    details: Record<string, any>;
    readonly image: string;
    readonly category: Category;
}
