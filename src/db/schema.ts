import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const urlShortenerTable = sqliteTable("url_shortener", {
  id: integer("id").primaryKey(),
  Token: text("short_token").unique().notNull(),
  encryptedURL: text("encrypted_url").notNull(),
  clickCount: integer("click_count").default(0).notNull(),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date()
  ),
});

export type InsertUrlShortener = typeof urlShortenerTable.$inferInsert;
export type SelectUrlShortener = typeof urlShortenerTable.$inferSelect;
