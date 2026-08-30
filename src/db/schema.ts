import {
  index,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from 'drizzle-orm/pg-core';

export const urlsTable = pgTable(
  'urls',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    url: text('url').notNull(),
    slug: text('slug').notNull(),
    createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp({ withTimezone: true })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index('idx_slug').on(table.slug),
    unique('unq_slug').on(table.slug),
  ],
);
