
import { PrismaClient } from '@prisma/client';
import * as argon from 'argon2'

const prisma = new PrismaClient();

async function main() {
  // Create users
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
        name: 'Novel',
        description: 'Interesting novel.',
        price: 19.99,
        quantity: 100,
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
