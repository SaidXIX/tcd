export const authDocumentation = {
    paths: {
      '/api/auth/register': {
        post: {
          summary: 'Register a new user',
          description: 'This endpoint allows a new user to register by providing their details.',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    firstName: { type: 'string', description: 'The first name of the user' },
                    familyName: { type: 'string', description: 'The family name of the user' },
                    email: { type: 'string', format: 'email', description: 'The email of the user' },
                    password: { type: 'string', description: 'The password for the user account' },
                    role: { type: 'string', description: 'The role assigned to the user' },
                  },
                  required: ['firstName', 'familyName', 'email', 'password', 'role'],
                },
              },
            },
          },
          responses: {
            201: { description: 'User registered successfully' },
            403: { description: 'User already exists' },
          },
        },
      },
      '/api/auth/login': {
        post: {
          summary: 'Log in an existing user',
          description: 'This endpoint allows an existing user to log in by providing their credentials.',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: { type: 'string', format: 'email', description: 'The email of the user' },
                    password: { type: 'string', description: 'The password for the user account' },
                  },
                  required: ['email', 'password'],
                },
              },
            },
          },
          responses: {
            200: { description: 'User logged in successfully' },
            403: { description: 'Credentials incorrect' },
          },
        },
      },
      '/api/auth/refresh': {
        post: {
          summary: 'Refresh user tokens',
          description: 'This endpoint allows a user to refresh their access and refresh tokens using the user ID and refresh token.',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    userId: { type: 'string', description: 'The ID of the user' },
                    refreshToken: { type: 'string', description: 'The refresh token for the user' },
                  },
                  required: ['userId', 'refreshToken'],
                },
              },
            },
          },
          responses: {
            200: { description: 'Tokens refreshed successfully' },
            403: { description: 'Access denied or invalid refresh token' },
          },
        },
      },
      '/api/auth/logout': {
        post: {
          summary: 'Log out a user',
          description: 'This endpoint allows a user to log out by invalidating their refresh token.',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    userId: { type: 'string', description: 'The ID of the user to log out' },
                  },
                  required: ['userId'],
                },
              },
            },
          },
          responses: {
            204: { description: 'User logged out successfully' },
          },
        },
      },
    },
  };
  