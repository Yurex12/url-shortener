import express from 'express';
import { validateRequestParams } from '../middleware/validationMiddleware.js';
import { urlParamSchema } from '../schemas/url.schema.js';
import { redirectUrl } from '../controllers/url.controller.js';

const router = express.Router();

router.get('/:slug', validateRequestParams(urlParamSchema), redirectUrl);

export default router;
