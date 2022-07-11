import mongoose, { Document } from 'mongoose';
import { Category } from '../../category/schemas/category.schema';
export declare type ProductDocument = Product & Document;
export declare class Product {
    name: string;
    price: number;
    details: Record<string, any>;
    image: string;
    category: Category;
}
export declare const ProductSchema: mongoose.Schema<Product, mongoose.Model<Product, any, any, any, any>, {}, {}, any, {}, "type", Product>;
