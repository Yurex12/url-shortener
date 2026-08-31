import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import request from 'supertest';

import app from '../../src/app.js';

import { db } from '../../src/db/index.js';
import { urlsTable } from '../../src/db/schema.js';

describe('URL API', () => {
  beforeEach(async () => {
    await db.delete(urlsTable);
  });

  it('should create a short URL', async () => {
    const response = await request(app).post('/api/urls').send({
      url: 'https://example.com/some/long/url',
    });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.slug).toBeDefined();
    expect(response.body.shortUrl).toBe(
      `${process.env.BASE_URL}/${response.body.slug}`,
    );
  });

  it('should return 400 for invalid URL', async () => {
    const response = await request(app).post('/api/urls').send({
      url: 'name',
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.slug).toBeUndefined();
  });

  it('should redirect the user using short url', async () => {
    const newUrl = await request(app).post('/api/urls').send({
      url: 'https://example.com',
    });

    expect(newUrl.status).toBe(201);
    expect(newUrl.body.slug).toBeDefined();

    const response = await request(app).get(`/${newUrl.body.slug}`);

    expect(response.status).toBe(302);
    expect(response.headers.location).toBe('https://example.com');
  });
});
