import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, EditProductDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}
  async createProduct(userId: string, dto: CreateProductDto) {
    const product = await this.prisma.product.create({
      data: {
        userId,
        ...dto,
      },
    });
    return product;
  }

  async updateProduct(productId: string, dto: EditProductDto) {
    let product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) throw new NotFoundException({ message: 'Product not found' });
    product = await this.prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        ...dto,
      },
    });

    return { message: 'Product updated successfully', product };
  }

  async getProducts() {
    const products = await this.prisma.product.findMany();
    return products;
  }

  async getProductById(productId: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
    if (!product) throw new NotFoundException({ message: 'Product not found' });
    return product;
  }
}
