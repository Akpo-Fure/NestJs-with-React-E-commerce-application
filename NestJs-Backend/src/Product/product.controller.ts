import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard, JwtGuard } from '../Auth/Guards/index';
import { CreateProductDto, EditProductDto } from './dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @UseGuards(JwtGuard, AdminGuard)
  @Post()
  createProduct(@Request() req, @Body() dto: CreateProductDto) {
    const userId = req.user.id;
    return this.productService.createProduct(userId, dto);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Patch(':id')
  updateProduct(@Param('id') productId: string, @Body() dto: EditProductDto) {
    return this.productService.updateProduct(productId, dto);
  }

  @Get()
  getProducts() {
    return this.productService.getProducts();
  }

  @Get(':id')
  getProductById(@Param('id') productId: string) {
    return this.productService.getProductById(productId);
  }
}
