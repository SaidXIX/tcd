import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    const categoryExists = await this.prisma.category.findUnique({
      where: {
        name: createCategoryDto.name,
      },
    });

    if (categoryExists) {
      throw new ForbiddenException('This category already exists');
    } else {
      return this.prisma.category.create({
        data: createCategoryDto,
      });
    }
  }

  async updateCategory(updateCategoryDto: UpdateCategoryDto, id: string) {
    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async deleteCategory(id: string) {
    return this.prisma.category.update({
      where: { id },
      data: { isDeleted: true },
    });
  }

  async listCategories() {
    return this.prisma.category.findMany({
      where: {
        isDeleted: false,
      },
    });
  }
}
