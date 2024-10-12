import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

enum ROLE {
  admin = 'ADMIN',
  manager = 'MANAGER',
  client = 'CLIENT',
}

export class AuthRegisterDto {
  @ApiProperty({ description: 'The first name of the user' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'The family name of the user' })
  @IsNotEmpty()
  familyName: string;

  @ApiProperty({ description: 'The role assigned to the user' })
  @IsNotEmpty()
  @IsEnum(ROLE, { message: 'Role must be either ADMIN, MANAGER, or CLIENT' })
  role: ROLE;

  @ApiProperty({ description: 'The email of the user', format: 'email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'The password of the user' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}

export class AuthLoginDto {
  @ApiProperty({ description: 'The email of the user' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'The password for the user account' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
