import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async createProduct(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async deleteProduct(id: string) {
    return this.prisma.product.update({
      where: { id },
      data: { isDeleted: true },
    });
  }

  async listProducts(cursor?: string) {
    return this.prisma.product.findMany({
      where: { isDeleted: false },
      take: 10,
      ...(cursor && { cursor: { id: cursor }, skip: 1 }),
      orderBy: { createdAt: 'asc' },
    });
  }

  async filterProducts(
    categoryName?: string,
    minPrice?: number,
    maxPrice?: number,
    cursor?: string,
  ) {
    let categoryId;
  
    if (categoryName) {
      categoryId = await this.getCategoryIdByName(categoryName);
    }
  
    return this.prisma.product.findMany({
      where: {
        isDeleted: false,
        ...(categoryId && { categoryId }),
        ...(minPrice !== undefined && { price: { gte: minPrice } }),
        ...(maxPrice !== undefined && { price: { lte: maxPrice } }),
      },
      include: {
        category: { select: { name: true } },
      },
      take: 10,
      ...(cursor && { cursor: { id: cursor }, skip: 1 }),
      orderBy: { createdAt: 'asc' },
    });
  }

  private async getCategoryIdByName(categoryName: string): Promise<string> {
    const category = await this.prisma.category.findUnique({
      where: { name: categoryName },
    });

    if (!category) {
      throw new NotFoundException(`Category with name ${categoryName} not found`);
    }

    return category.id;
  }
}
