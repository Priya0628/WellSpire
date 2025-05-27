import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  interests: text("interests").array().default([]),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const tips = pgTable("tips", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  category: text("category").notNull(),
  content: text("content").notNull(),
  tags: text("tags").array().default([]),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const userActivity = pgTable("user_activity", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  action: text("action").notNull(), // 'view_category', 'view_content', 'create_tip'
  category: text("category"),
  contentId: text("content_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertTipSchema = createInsertSchema(tips).pick({
  username: true,
  category: true,
  content: true,
});

export const insertActivitySchema = createInsertSchema(userActivity).pick({
  username: true,
  action: true,
  category: true,
  contentId: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertTip = z.infer<typeof insertTipSchema>;
export type Tip = typeof tips.$inferSelect;
export type InsertActivity = z.infer<typeof insertActivitySchema>;
export type UserActivity = typeof userActivity.$inferSelect;
