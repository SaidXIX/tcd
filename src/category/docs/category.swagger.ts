export const categoryDocumentation = {
    paths: {
      '/api/category/create': {
        post: {
          summary: 'Create a new category',
          description: 'This endpoint allows an admin or manager to create a new category by providing the category details.',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string', description: 'The name of the category' },
                  },
                  required: ['name'],
                },
              },
            },
          },
          responses: {
            201: { description: 'Category created successfully' },
            403: { description: 'This category already exists' },
          },
        },
      },
      '/api/category/update/{id}': {
        put: {
          summary: 'Update an existing category',
          description: 'This endpoint allows an admin or manager to update the details of an existing category.',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'The ID of the category to be updated',
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
                    name: { type: 'string', description: 'The updated name of the category' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Category updated successfully' },
            404: { description: 'Category not found' },
          },
        },
      },
      '/api/category/delete/{id}': {
        delete: {
          summary: 'Delete a category by ID',
          description: 'This endpoint allows an admin to delete a category by providing the category ID.',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'The ID of the category to be deleted',
              schema: { type: 'string' },
            },
          ],
          responses: {
            200: { description: 'Category deleted successfully' },
            404: { description: 'Category not found' },
          },
        },
      },
      '/api/category/all': {
        get: {
          summary: 'List all categories',
          description: 'This endpoint allows an admin or manager to retrieve a list of all categories.',
          responses: {
            200: {
              description: 'List of categories retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'string', description: 'The ID of the category' },
                        name: { type: 'string', description: 'The name of the category' },
                        isDeleted: { type: 'boolean', description: 'Indicates if the category is deleted' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };
  