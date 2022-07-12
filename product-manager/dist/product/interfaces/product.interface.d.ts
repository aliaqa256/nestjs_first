import { Category } from '../../category/schemas/category.schema';
export interface Product {
    id?: string;
    name: string;
    price: number;
    details: Record<string, any>;
    image: string;
    category: Category;
}
