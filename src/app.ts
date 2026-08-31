import express from 'express';
import path from 'node:path';

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swagger.js';

import urlRoutes from './routes/url.routes.js';
import redirectRoutes from './routes/redirect.routes.js';
import {
  errorHandler,
  notFoundHandler,
} from './middleware/error.middleware.js';

const app = express();

app.use(express.json());

app.use(express.static(path.join(process.cwd(), 'public')));

app.get('/health', (req, res) => res.send('API is running...'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/urls', urlRoutes);
app.use(redirectRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
