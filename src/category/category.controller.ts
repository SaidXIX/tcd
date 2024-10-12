import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService){}

    @Post('create')
    @UseGuards(JwtAuthGuard, new RolesGuard('ADMIN', 'MANAGER'))
    async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoryService.createCategory(createCategoryDto)
    }

    @Put('update/:id')
    @UseGuards(JwtAuthGuard, new RolesGuard('ADMIN', 'MANAGER'))
    async updateCategory(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto){
        return this.categoryService.updateCategory(updateCategoryDto, id)
    }

    @Delete('delete/:id')
    @UseGuards(JwtAuthGuard, new RolesGuard('ADMIN'))
    async deleteCategory(@Param('id') id: string) {
      return this.categoryService.deleteCategory(id);
    }

    @Get('all')
    @UseGuards(JwtAuthGuard)
    async listCategories() {
      return this.categoryService.listCategories();
    }

}
