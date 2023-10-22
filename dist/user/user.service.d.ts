import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProfileDTO } from './dto';
interface Request {
    user: User;
    headers: {
        authorization: string;
    };
}
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    getUser(req: Request): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        isAdmin: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateUserProfile(id: string, dto: UpdateProfileDTO): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        isAdmin: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllUsers(): Promise<{
        email: string;
        name: string;
        isAdmin: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
export {};
