import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Auth } from './interfaces/auth.interface';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(createAuthDto: CreateAuthDto): Promise<Auth>;
    signin(createAuthDto: CreateAuthDto): Promise<{
        token: string;
    }>;
}
