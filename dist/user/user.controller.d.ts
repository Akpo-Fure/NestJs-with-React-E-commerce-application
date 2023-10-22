import { UserService } from './user.service';
import { UpdateProfileDTO } from './dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUser(req: any): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        isAdmin: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateUserUprofile(req: any, dto: UpdateProfileDTO): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        isAdmin: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
