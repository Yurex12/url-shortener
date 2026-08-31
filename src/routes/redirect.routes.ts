import express from 'express';
import { validateRequestParams } from '../middleware/validationMiddleware.js';
import { urlParamSchema } from '../schemas/url.schema.js';
import { redirectUrl } from '../controllers/url.controller.js';

const router = express.Router();

/**
 * @openapi
 * /{slug}:
 *   get:
 *     summary: Redirect to the original URL
 *     tags:
 *       - URLs
 *     parameters:
 *       - name: slug
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: a7Kx92
 *     responses:
 *       302:
 *         description: Redirects to the original URL
 *       404:
 *         description: Short URL not found
 *       400:
 *         description: Invalid slug
 */
router.get('/:slug', validateRequestParams(urlParamSchema), redirectUrl);

export default router;
