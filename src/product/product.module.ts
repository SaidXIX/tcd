import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [PrismaModule],
  controllers: [ProductController],
  providers: [ProductService, JwtService, AuthService]
})
export class ProductModule {}
