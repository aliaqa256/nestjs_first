import mongoose, { Document } from 'mongoose';
export declare type CategoryDocument = Category & Document;
export declare class Category {
    category_name: string;
    parent: Category;
    is_parent: boolean;
}
export declare const ProductSchema: mongoose.Schema<Category, mongoose.Model<Category, any, any, any, any>, {}, {}, any, {}, "type", Category>;
