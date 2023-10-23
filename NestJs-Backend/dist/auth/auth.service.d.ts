import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDto, SigninDto } from './Dto';
export declare class AuthService {
    private prisma;
    private jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
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
