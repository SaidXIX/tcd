# TCD Project

This project is a NestJS application that connects to a MongoDB database. This README will guide you through the setup process, from building the MongoDB image to starting the NestJS application.

## Prerequisites

Make sure you have the following installed:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- Node.js (for local development)

## Project Structure

```
.
├── app                   # NestJS application source code
├── Dockerfile            # Dockerfile for the NestJS application
├── docker-compose.yml    # Docker Compose configuration
├── .env                  # Environment variables for the application
└── README.md             # This README file
```

## Environment Variables

Create a `.env` file in the root directory of the project and add the following variables:

```env
DATABASE_URL="mongodb://tcd:tcd@mongodb_container:27017/db?authSource=admin"
JWT_SECRET="8b8f09e7405e0c0a219d5be84b5948b848a27e3c4c80ec524cb23bcd1aebf5ed"
JWT_REFRESH_SECRET="9d573fc51d292cbecf6ad1e04c7dba45b1d7f6c56b9c8ae6b01c5cb78bdf78a2"
```

## Docker Setup

### Step 1: Build and Start MongoDB

1. **Open a terminal** and navigate to the project directory.

2. **Run the following command** to build and start the MongoDB container:

   ```bash
   docker-compose up -d mongodb_container
   ```

   This command will create and run a MongoDB container using the image specified in the `docker-compose.yml` file.

### Step 2: Build and Start the NestJS Application

1. After the MongoDB container is running, you can build and start the NestJS application by executing:

   ```bash
   docker-compose up -d nestjs_app
   ```

   This command will build the NestJS image defined in the `Dockerfile` and run the application container.

2. **Verify that the application is running** by checking the logs:

   ```bash
   docker-compose logs nestjs_app
   ```

   You should see logs indicating that the application has started successfully.

## Accessing the Application

Once the NestJS application is running, you can access it at `http://localhost:3000`.

## Stopping the Containers

To stop the running containers, use the following command:

```bash
docker-compose down
```
