import { describe, expect, it } from 'vitest';

import { generateSlug } from '../../src/utils/generateSlug.js';

describe('generateSlug', () => {
  it('returns a string', () => {
    const slug = generateSlug(8);

    expect(slug).toBeTypeOf('string');
  });
  it('return a slug of expected length', () => {
    const slug = generateSlug(8);

    expect(slug).toHaveLength(8);
  });

  it('uses URL-safe slug characters', () => {
    const slug = generateSlug();

    expect(slug).toMatch(/^[A-Za-z0-9_-]+$/);
  });
  it('generates different slugs', () => {
    const slug1 = generateSlug();
    const slug2 = generateSlug();

    expect(slug1).not.toBe(slug2);
  });
});
