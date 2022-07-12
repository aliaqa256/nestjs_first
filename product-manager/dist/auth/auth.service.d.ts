import { Model } from 'mongoose';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthDocument } from './schemas/auth.schema';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private authModel;
    private jwt;
    constructor(authModel: Model<AuthDocument>, jwt: JwtService);
    signup(createAuthDto: CreateAuthDto): Promise<{
        created: boolean;
    }>;
    signin(createAuthDto: CreateAuthDto): Promise<{
        token: string;
    }>;
    signToken(userid: any, email: any, is_superuser: any): Promise<{
        token: string;
    }>;
}
