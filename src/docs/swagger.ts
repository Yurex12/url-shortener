import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'URL Shortener API',
      version: '1.0.0',
      description: 'A simple URL shortening API',
    },
    servers: [
      {
        url: process.env.BASE_URL,
      },
    ],
  },
  apis:
    process.env.NODE_ENV === 'production'
      ? ['./dist/routes/*.js']
      : ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);
