import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { authDocumentation } from './auth//docs/auth.swagger';
import { userDocumentation } from './user/docs/user.swagger';
import { categoryDocumentation } from './category/docs/category.swagger';
import { productDocumentation } from './product/docs/product.swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api')

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Combined API Documentation')
    .setDescription('API documentation for Auth and User')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  Object.assign(
    document.paths,
    authDocumentation.paths,
    userDocumentation.paths,
    categoryDocumentation.paths,
    productDocumentation.paths,
  );

  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}

bootstrap();
