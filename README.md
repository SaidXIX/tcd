# Product Management

This Project is a Nest.js application designed for handling product data and providing role-based access control (RBAC). It allows users to create, update, view, and delete products with different levels of permissions based on their roles: Admin, Manager, and Client. Secured with Authentication using JWT, Refresh token rotation.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Project Setup](#project-setup)
  - [Step 1: Build and Start MongoDB](#step-1-build-and-start-mongodb)
  - [Step 2: Build and Start the NestJS Application](#step-2-build-and-start-the-nestjs-application)
- [API Features](#api-features)
  - [Role-Based Access Control (RBAC)](#role-based-access-control-rbac)
  - [Products](#products)
  - [Categories](#categories)
  - [User Management](#user-management)
  - [JWT Authentication](#jwt-authentication)
- [Security](#security)
- [Additional Features](#additional-features)

---

## Prerequisites

Before starting the project, ensure you have the following installed:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/en)

## Project Setup

### Step 1: Build and Start MongoDB

1. Open a terminal and navigate to the project directory.
2. Run the following command to build and start the MongoDB container:

   ```bash
   docker-compose up -d
   ```

   This command creates and runs a MongoDB container using the `docker-compose.yml` file.

### Step 2: Build and Start the NestJS Application
1. First of all we need to install the required modules in order to spin up our Nest.js Server
   ```bash
   npm install
   ```
2. Then since we are using [Prisma](https://www.prisma.io/) we need to generate prisma client that interacts with the databas
   ```bash
   npm run prisma generate
   ```
3. After that we have to execute the prisma schema and apply it on the database
   ```bash
   npx prisma db push
   ```
4. since we will be interacting with products, categories, users, I decided to add a seeder to get you started with testing directly 
   ```bash
   npm run seed
   ```
5. Now we're ready to startup our server 
   ```bash
   npm run start:dev
   ```
6. The server will start up on port `3000`, the base Api path is `localhost:3000/api`

## API Features

### Role-Based Access Control (RBAC)
Access to API resources is controlled by user roles:
- **Admin**: Full access to all operations (CRUD) on users, products, and categories.
- **Manager**: Can create and update products and categories but cannot delete them.
- **Client**: Can only read/view products and categories.

### User Roles
The application supports three roles:
- **Admin**: Can manage users, products, and categories.
- **Manager**: Can create and update products and categories but cannot delete them.
- **Client**: Can only view products and categories.

### Products
Each product includes the following properties:
- `name`: Name of the product.
- `description`: Detailed information about the product.
- `price`: Product price.
- `category`: Category the product belongs to.
- `stock quantity`: Number of products available in stock.

### Categories
Categories help organize products. Each category includes:
- `name`: Name of the category.
- `description`: Description of the category.

### User Management
Admins can manage users through the following actions:
- **Create Users**: Register users with roles.
- **Manage Users**: Update user details, assign roles, and delete users.

### JWT Authentication
- Users can register and log in using their email and password.
- Upon login, a JWT access token and a refresh token are returned.
- The access token is short-lived, while the refresh token is long-lived.
- The API allows users to refresh access tokens without re-logging in.

### CRUD Operations
- **Admins** and **Managers** can create, read, update, and delete products and categories.
- **Clients** can only view products and categories.

## Security

- **JWT Authentication**: All protected endpoints require valid JWT access tokens.
- **Refresh Token Mechanism**: Refresh tokens are used to renew access tokens without requiring a re-login.
- **Input Validation**: Data like product name, price, stock quantity, and category are validated to ensure integrity.

## Additional Features

- **Pagination**: Pagination for products is implemented to allow fetching results in smaller chunks ☑️
- **Soft Deletion**: Products and categories can be marked as "deleted" without being removed from the database ☑️
- **API Documentation**: Use [Swagger](https://swagger.io/) to document API endpoints☑️ check the url `http://localhost:3000/api/docs` for the documentation

