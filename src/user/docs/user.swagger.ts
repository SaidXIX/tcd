export const userDocumentation = {
    paths: {
      '/api/user/create': {
        post: {
          summary: 'Create a new user',
          description: 'This endpoint allows an admin to create a new user by providing the user details.',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: { type: 'string', format: 'email', description: 'The email of the user' },
                    password: { type: 'string', description: 'The password for the user account' },
                    firstName: { type: 'string', description: 'The first name of the user' },
                    familyName: { type: 'string', description: 'The family name of the user' },
                    role: { type: 'string', description: 'The role assigned to the user' },
                  },
                  required: ['email', 'password', 'firstName', 'familyName', 'role'],
                },
              },
            },
          },
          responses: {
            201: { description: 'User created successfully' },
            409: { description: 'User with this email already exists' },
          },
        },
      },
      '/api/user/assign-role/{userId}': {
        patch: {
          summary: 'Assign a role to a user',
          description: 'This endpoint allows an admin to assign a role to an existing user.',
          parameters: [
            {
              name: 'userId',
              in: 'path',
              required: true,
              description: 'The ID of the user to whom the role will be assigned',
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
                    role: { type: 'string', description: 'The new role to assign to the user' },
                  },
                  required: ['role'],
                },
              },
            },
          },
          responses: {
            200: { description: 'Role assigned successfully' },
            404: { description: 'User not found' },
          },
        },
      },
      '/api/user/delete/{userId}': {
        delete: {
          summary: 'Delete a user by ID',
          description: 'This endpoint allows an admin to delete a user by providing the user ID.',
          parameters: [
            {
              name: 'userId',
              in: 'path',
              required: true,
              description: 'The ID of the user to be deleted',
              schema: { type: 'string' },
            },
          ],
          responses: {
            200: { description: 'User deleted successfully' },
            404: { description: 'User not found' },
          },
        },
      },
    },
  };
  