import { PrismaClient } from '@prisma/client';
import * as argon from 'argon2'

const prisma = new PrismaClient();

async function main() {
  const hashedPassword1 = await argon.hash('admin123')
  const admin = await prisma.user.create({
    data: {
      firstName: 'Admin',
      familyName: 'User',
      email: 'admin@example.com',
      password: hashedPassword1,
      role: 'ADMIN',
    },
  });

  const hashedPassword2 = await argon.hash('manager123')
  const manager = await prisma.user.create({
    data: {
      firstName: 'Manager',
      familyName: 'User',
      email: 'manager@example.com',
      password: hashedPassword2,
      role: 'MANAGER',
    },
  });

  const hashedPassword3 = await argon.hash('client123')
  const client = await prisma.user.create({
    data: {
      firstName: 'Client',
      familyName: 'User',
      email: 'client@example.com',
      password: hashedPassword3,
      role: 'CLIENT',
    },
  });

  const electronics = await prisma.category.create({
    data: {
      name: 'Electronics',
      description: 'Electronic devices and gadgets.',
    },
  });

  const books = await prisma.category.create({
    data: {
      name: 'Books',
      description: 'Various kinds of books.',
    },
  });

  await prisma.product.createMany({
    data: [
      {
        name: 'Smartphone',
        description: 'Latest smartphone model.',
        price: 699.99,
        quantity: 50,
        categoryId: electronics.id,
      },
      {
        name: 'Laptop',
        description: 'High performance laptop.',
        price: 1299.99,
        quantity: 30,
        categoryId: electronics.id,
      },
      {
        name: 'Tablet',
        description: 'Portable tablet device.',
        price: 399.99,
        quantity: 40,
        categoryId: electronics.id,
      },
      {
        name: 'Headphones',
        description: 'Noise-cancelling headphones.',
        price: 199.99,
        quantity: 100,
        categoryId: electronics.id,
      },
      {
        name: 'Smartwatch',
        description: 'Wearable smartwatch.',
        price: 249.99,
        quantity: 60,
        categoryId: electronics.id,
      },
      {
        name: 'Gaming Console',
        description: 'Next-gen gaming console.',
        price: 499.99,
        quantity: 25,
        categoryId: electronics.id,
      },
      {
        name: 'Camera',
        description: 'Professional digital camera.',
        price: 899.99,
        quantity: 20,
        categoryId: electronics.id,
      },
      {
        name: 'Novel',
        description: 'Interesting novel.',
        price: 19.99,
        quantity: 100,
        categoryId: books.id,
      },
      {
        name: 'Science Fiction Book',
        description: 'Popular science fiction novel.',
        price: 24.99,
        quantity: 80,
        categoryId: books.id,
      },
      {
        name: 'Biography',
        description: 'Biography of a famous person.',
        price: 29.99,
        quantity: 50,
        categoryId: books.id,
      },
      {
        name: 'Mystery Novel',
        description: 'Suspenseful mystery novel.',
        price: 17.99,
        quantity: 120,
        categoryId: books.id,
      },
      {
        name: 'Cookbook',
        description: 'Delicious recipes and cooking tips.',
        price: 34.99,
        quantity: 70,
        categoryId: books.id,
      },
      {
        name: 'History Book',
        description: 'Book covering historical events.',
        price: 39.99,
        quantity: 60,
        categoryId: books.id,
      },
      {
        name: 'Fantasy Book',
        description: 'A popular fantasy series book.',
        price: 22.99,
        quantity: 90,
        categoryId: books.id,
      },
      {
        name: 'Textbook',
        description: 'Educational textbook for students.',
        price: 59.99,
        quantity: 30,
        categoryId: books.id,
      },
    ],
  });

  console.log('Seeding complete!');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
