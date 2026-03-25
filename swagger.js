const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog API - INF222',
      version: '1.0.0',
      description: 'API REST pour la gestion d\'articles de blog. Développée avec Node.js, Express et MySQL.',
      contact: {
        name: 'INF222 - EC1',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Serveur de développement',
      },
    ],
    tags: [
      {
        name: 'Articles',
        description: 'Gestion des articles du blog',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };
