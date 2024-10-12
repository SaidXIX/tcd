import { Controller, Post, Body, Put, Param, Delete, Get, UseGuards, Req, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { RolesGuard } from '../guards/roles.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}


  @Post('create')
  @UseGuards(JwtAuthGuard, new RolesGuard('ADMIN', 'MANAGER'))
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }



  @Put('update/:id')
  @UseGuards(JwtAuthGuard, new RolesGuard('ADMIN', 'MANAGER'))
  async updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.updateProduct(id, updateProductDto);
  }



  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard, new RolesGuard('ADMIN'))
  async deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }



  @Get('all')
  @UseGuards(JwtAuthGuard)
  async listProducts(
    @Query('cursor') cursor?: string,
  ) {
    return this.productService.listProducts(cursor);
  }



  @Get('filter')
  @UseGuards(JwtAuthGuard)
  async filterProducts(
    @Query('categoryName') categoryName?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('cursor') cursor?: string,
  ) {
    const minPriceNum = minPrice ? parseFloat(minPrice) : undefined;
    const maxPriceNum = maxPrice ? parseFloat(maxPrice) : undefined;
  
    return this.productService.filterProducts(categoryName, minPriceNum, maxPriceNum, cursor);
  }
}
