import express from 'express';
import { createUrl } from '../controllers/url.controller.js';
import { validateRequestBody } from '../middleware/validationMiddleware.js';
import { urlSchema } from '../schemas/url.schema.js';

const router = express.Router();

router.post('/', validateRequestBody(urlSchema), createUrl);

export default router;
