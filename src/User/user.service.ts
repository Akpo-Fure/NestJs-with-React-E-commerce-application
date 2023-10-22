import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProfileDTO } from './dto';

interface Request {
  user: User;
  headers: {
    authorization: string;
  };
}

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async getUser(req: Request) {
    return req.user;
  }

  async updateUserProfile(id: string, dto: UpdateProfileDTO) {
    let user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) throw new NotFoundException({ message: 'User not found' });

    user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });

    delete user.password;
    return user;
  }
}
