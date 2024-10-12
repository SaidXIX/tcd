import { IsString, IsNumber, IsNotEmpty, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'The name of the product', example: 'Laptop' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'A brief description of the product', example: 'High performance laptop' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'The price of the product', example: 999.99 })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({ description: 'The quantity of the product in stock', example: 50 })
  @IsNumber()
  @IsPositive()
  quantity: number;

  @ApiProperty({ description: 'The ID of the category this product belongs to', example: 'category-id' })
  @IsString()
  @IsNotEmpty()
  categoryId: string;
}
