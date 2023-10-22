import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDto, SigninDto } from './Dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    const hashedPassword = await argon.hash(dto.password);
    dto.password = hashedPassword;
    const user = await this.prisma.user.create({
      data: {
        ...dto,
      },
    });
    delete user.password;
    return { message: 'Sign up successful', user };
  }

  async signin(dto: SigninDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) return { message: 'invalid credentials' };

    const verify = await argon.verify(user.password, dto.password);
    if (!verify) return { message: 'invalid credentials' };

    const payload = { sub: user.id, admin: user.isAdmin };
    const token = await this.jwt.signAsync(payload);
    return { message: 'Log in successful', token };
  }
}
