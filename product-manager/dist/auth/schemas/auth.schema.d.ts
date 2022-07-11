import mongoose, { Document } from 'mongoose';
export declare type AuthDocument = Auth & Document;
export declare class Auth {
    email: string;
    password: string;
    is_superuser: boolean;
}
export declare const AuthSchema: mongoose.Schema<Auth, mongoose.Model<Auth, any, any, any, any>, {}, {}, any, {}, "type", Auth>;
