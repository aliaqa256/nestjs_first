import mongoose, { Document } from 'mongoose';
export declare type TranslationDocument = Translation & Document;
export declare class Translation {
    persian: string;
    english: string;
}
export declare const TranslationSchema: mongoose.Schema<Translation, mongoose.Model<Translation, any, any, any, any>, {}, {}, any, {}, "type", Translation>;
