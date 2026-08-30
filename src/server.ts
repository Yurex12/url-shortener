import 'dotenv/config';
import express from 'express';

import urlRoutes from './routes/url.routes.js';
import {
  errorHandler,
  notFoundHandler,
} from './middleware/error.middleware.js';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.get('/', (req, res) => res.send('API is running...'));
app.use('/api/urls', urlRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on PORT:${PORT}`);
});
