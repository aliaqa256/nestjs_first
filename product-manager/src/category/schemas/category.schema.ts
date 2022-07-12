import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  category_name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  parent: Category;

  @Prop({
    type: Boolean,
    default: false,
  })
  is_parent: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
