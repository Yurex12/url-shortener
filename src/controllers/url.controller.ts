import type { Response } from 'express';
import type { CreateUrlInput, UrlParams } from '../schemas/url.schema.js';
import { createShortUrl, getUrlBySlug } from '../services/url.service.js';
import type { TypedRequest } from '../types/express.js';

export const createUrl = async (
  req: TypedRequest<CreateUrlInput>,
  res: Response,
) => {
  const { url } = req.body;

  const { slug } = await createShortUrl(url);

  const shortUrl = `${process.env.BASE_URL}/${slug}`;

  res.status(201).json({
    success: true,
    message: 'Url shortened successfully',
    slug,
    shortUrl,
  });
};

export const redirectUrl = async (
  req: TypedRequest<unknown, UrlParams>,
  res: Response,
) => {
  const { slug } = req.params;

  const { url } = await getUrlBySlug(slug);

  res.redirect(302, url);
};
