import crypto from 'node:crypto';

export function generateSlug(length = 7) {
  return crypto.randomBytes(length).toString('base64url').slice(0, length);
}
