import { Controller, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('order')
export class OrderController {
  constructor(private prisma: PrismaService) {}

  @Post()
  Signip() {}
}
