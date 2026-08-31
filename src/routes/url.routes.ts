import express from 'express';
import { createUrl } from '../controllers/url.controller.js';
import { validateRequestBody } from '../middleware/validationMiddleware.js';
import { urlSchema } from '../schemas/url.schema.js';

const router = express.Router();

/**
 * @openapi
 * /api/urls:
 *   post:
 *     summary: Create a shortened URL
 *     tags:
 *       - URLs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - url
 *             properties:
 *               url:
 *                 type: string
 *                 format: uri
 *                 example: https://example.com/very/long/url
 *     responses:
 *       201:
 *         description: URL shortened successfully
 *       400:
 *         description: Invalid URL
 */

router.post('/', validateRequestBody(urlSchema), createUrl);

export default router;
