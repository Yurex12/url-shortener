import z from 'zod';

export const urlSchema = z.object({
  url: z
    .url('Please provide a valid URL')
    .trim()
    .max(2048, 'URL is too long')
    .refine((value) => {
      try {
        const protocol = new URL(value).protocol;
        return protocol === 'http:' || protocol === 'https:';
      } catch {
        return false;
      }
    }, 'Only HTTP and HTTPS URLs are allowed'),
});
export const urlParamSchema = z.object({
  slug: z.string().min(1, 'slug is required'),
});

export type CreateUrlInput = z.infer<typeof urlSchema>;
export type UrlParams = z.infer<typeof urlParamSchema>;
