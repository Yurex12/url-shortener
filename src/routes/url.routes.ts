import express from 'express';
import {
  validateRequestBody,
  validateRequestParams,
} from '../middleware/validationMiddleware.js';
import { urlParamSchema, urlSchema } from '../schemas/url.schema.js';
import { createUrl, redirectUrl } from '../controllers/url.controller.js';

const router = express.Router();

router.post('/', validateRequestBody(urlSchema), createUrl);
router.get('/:slug', validateRequestParams(urlParamSchema), redirectUrl);

export default router;
