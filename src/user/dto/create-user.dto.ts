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
  
  export class CreateUserDto {
    @ApiProperty({ description: 'first name of the user created' })
    @IsNotEmpty()
    firstName: string;
  
    @ApiProperty({ description: 'family name of the user created' })
    @IsNotEmpty()
    familyName: string;
  
    @ApiProperty({ description: 'role assigned to the user created' })
    @IsNotEmpty()
    @IsEnum(ROLE, { message: 'Role must be either ADMIN, MANAGER, or CLIENT' })
    role: ROLE;
  
    @ApiProperty({ description: 'email of the user created', format: 'email' })
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @ApiProperty({ description: 'password of the user created' })
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
  }

  