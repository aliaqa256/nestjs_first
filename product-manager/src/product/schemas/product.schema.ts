import { Prop, Schema, SchemaFactory,raw } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Category } from '../../category/schemas/category.schema';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
    price: number;

  @Prop(raw({}) )
  details: Record<string, any>;

    @Prop()
    image: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
    category: Category;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

