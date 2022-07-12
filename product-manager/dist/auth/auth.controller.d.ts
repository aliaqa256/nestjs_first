import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(createAuthDto: CreateAuthDto): Promise<{
        created: boolean;
    }>;
    signin(createAuthDto: CreateAuthDto): Promise<{
        token: string;
    }>;
}
