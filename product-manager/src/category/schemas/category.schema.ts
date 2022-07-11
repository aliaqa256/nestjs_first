import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop()
  category_name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  parent: Category;

  @Prop()
  is_parent: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
