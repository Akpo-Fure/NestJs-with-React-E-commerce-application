import { SigninDto, SignupDto } from './Dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(dto: SignupDto): Promise<{
        message: string;
        user: {
            id: string;
            name: string;
            email: string;
            password: string;
            isAdmin: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    signin(dto: SigninDto): Promise<{
        message: string;
        token?: undefined;
    } | {
        message: string;
        token: string;
    }>;
}
