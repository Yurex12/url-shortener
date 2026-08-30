import { eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { urlsTable } from '../db/schema.js';
import { generateSlug } from '../utils/generateSlug.js';
import { AppError } from '../utils/appError.js';

export async function createShortUrl(url: string) {
  const slug = generateSlug();

  const [newUrl] = await db
    .insert(urlsTable)
    .values({ url, slug })
    .returning({ slug: urlsTable.slug });

  if (!newUrl) throw new Error('Failed to create short URL');

  return { slug: newUrl.slug };
}

export async function getUrlBySlug(slug: string) {
  const [urlData] = await db
    .select()
    .from(urlsTable)
    .where(eq(urlsTable.slug, slug));

  if (!urlData) throw new AppError('URL not found', 404);

  return { url: urlData.url };
}
