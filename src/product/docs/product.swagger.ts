export const productDocumentation = {
    paths: {
      '/api/product/create': {
        post: {
          summary: 'Create a new product',
          description: 'This endpoint allows an admin or manager to create a new product by providing the product details.',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string', description: 'The name of the product' },
                    description: { type: 'string', description: 'A brief description of the product' },
                    price: { type: 'number', description: 'The price of the product' },
                    categoryId: { type: 'string', description: 'The ID of the category this product belongs to' },
                  },
                  required: ['name', 'description', 'price', 'categoryId'],
                },
              },
            },
          },
          responses: {
            201: { description: 'Product created successfully' },
          },
        },
      },
      '/api/product/update/{id}': {
        put: {
          summary: 'Update an existing product',
          description: 'This endpoint allows an admin or manager to update an existing product by providing the product ID and new details.',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'The ID of the product to be updated',
              schema: { type: 'string' },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string', description: 'The updated name of the product' },
                    description: { type: 'string', description: 'The updated description of the product' },
                    price: { type: 'number', description: 'The updated price of the product' },
                    categoryId: { type: 'string', description: 'The updated ID of the category this product belongs to' },
                  },
                  required: ['name', 'description', 'price', 'categoryId'],
                },
              },
            },
          },
          responses: {
            200: { description: 'Product updated successfully' },
            404: { description: 'Product not found' },
          },
        },
      },
      '/api/product/delete/{id}': {
        delete: {
          summary: 'Delete a product by ID',
          description: 'This endpoint allows an admin to delete a product by providing the product ID.',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'The ID of the product to be deleted',
              schema: { type: 'string' },
            },
          ],
          responses: {
            200: { description: 'Product deleted successfully' },
            404: { description: 'Product not found' },
          },
        },
      },
      '/api/product/all': {
        get: {
          summary: 'List all products',
          description: 'This endpoint allows an admin or manager to list all products.',
          parameters: [
            {
              name: 'cursor',
              in: 'query',
              required: false,
              description: 'Cursor for pagination',
              schema: { type: 'string' },
            },
          ],
          responses: {
            200: { description: 'List of products' },
          },
        },
      },
      '/api/product/filter': {
        get: {
          summary: 'Filter products',
          description: 'This endpoint allows an admin or manager to filter products based on category name and price range.',
          parameters: [
            {
              name: 'categoryName',
              in: 'query',
              required: false,
              description: 'Filter products by category name',
              schema: { type: 'string' },
            },
            {
              name: 'minPrice',
              in: 'query',
              required: false,
              description: 'Filter products with price greater than or equal to minPrice',
              schema: { type: 'number' },
            },
            {
              name: 'maxPrice',
              in: 'query',
              required: false,
              description: 'Filter products with price less than or equal to maxPrice',
              schema: { type: 'number' },
            },
            {
              name: 'cursor',
              in: 'query',
              required: false,
              description: 'Cursor for pagination',
              schema: { type: 'string' },
            },
          ],
          responses: {
            200: { description: 'Filtered list of products' },
          },
        },
      },
    },
  };
  