import { CreateProductDto, EditProductDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class ProductService {
    private prisma;
    constructor(prisma: PrismaService);
    createProduct(userId: string, dto: CreateProductDto): Promise<{
        id: string;
        name: string;
        image: string;
        userId: string;
        brand: string;
        category: string;
        description: string;
        rating: number;
        numReviews: number;
        price: number;
        countInStock: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateProduct(productId: string, dto: EditProductDto): Promise<{
        message: string;
        product: {
            id: string;
            name: string;
            image: string;
            userId: string;
            brand: string;
            category: string;
            description: string;
            rating: number;
            numReviews: number;
            price: number;
            countInStock: number;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    getProducts(): Promise<{
        id: string;
        name: string;
        image: string;
        userId: string;
        brand: string;
        category: string;
        description: string;
        rating: number;
        numReviews: number;
        price: number;
        countInStock: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getProductById(productId: string): Promise<{
        id: string;
        name: string;
        image: string;
        userId: string;
        brand: string;
        category: string;
        description: string;
        rating: number;
        numReviews: number;
        price: number;
        countInStock: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
