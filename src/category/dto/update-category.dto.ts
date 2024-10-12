import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({ description: 'The name of the category updated', example: 'Electronics' })
  @IsString()
  name?: string;

  @ApiProperty({ description: 'The description of the category updated', example: 'Electronics to use at home' })
  @IsString()
  description?: string;
}
