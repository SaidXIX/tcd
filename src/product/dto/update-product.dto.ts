import { IsNumber, IsPositive, IsString } from "class-validator";
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiPropertyOptional({ description: 'The updated name of the product', example: 'Updated Laptop' })
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'The updated description of the product', example: 'Updated high performance laptop' })
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'The updated price of the product', example: 899.99 })
  @IsNumber()
  @IsPositive()
  price?: number;

  @ApiPropertyOptional({ description: 'The updated quantity of the product in stock', example: 30 })
  @IsNumber()
  @IsPositive()
  quantity?: number;
}
