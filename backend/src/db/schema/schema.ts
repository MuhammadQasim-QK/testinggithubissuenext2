import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const greetings = pgTable('greetings', {
  id: serial('id').primaryKey(),
  message: text('message').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});
