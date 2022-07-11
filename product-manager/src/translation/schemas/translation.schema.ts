import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Category } from '../../category/schemas/category.schema';

export type TranslationDocument = Translation & Document;

@Schema()
export class Translation {
  @Prop()
    persian: string;

    @Prop()
    english: string;
}

export const TranslationSchema = SchemaFactory.createForClass(Translation);
