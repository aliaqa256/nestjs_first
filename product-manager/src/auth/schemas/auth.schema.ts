import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type AuthDocument = Auth & Document;

@Schema()
export class Auth {

  @Prop({ required: true, unique: true })
    email: string;
    @Prop()
    password: string;
    @Prop()
    is_superuser: boolean;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
