import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { OrderService } from './order/order.service';
import { OrderController } from './order/order.controller';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, OrderModule, ProductModule, UserModule, PrismaModule],
  controllers: [OrderController],
  providers: [AuthService, OrderService, PrismaService],
})
export class AppModule {}
