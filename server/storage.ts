import { users, tips, userActivity, type User, type InsertUser, type Tip, type InsertTip, type InsertActivity, type UserActivity } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getTips(): Promise<Tip[]>;
  createTip(tip: InsertTip): Promise<Tip>;
  trackActivity(activity: InsertActivity): Promise<UserActivity>;
  getUserActivity(username: string): Promise<UserActivity[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        ...insertUser,
        interests: [],
        createdAt: new Date()
      })
      .returning();
    return user;
  }

  async getTips(): Promise<Tip[]> {
    const allTips = await db.select().from(tips).orderBy(tips.createdAt);
    return allTips.reverse(); // Most recent first
  }

  async createTip(insertTip: InsertTip): Promise<Tip> {
    const [tip] = await db
      .insert(tips)
      .values({
        ...insertTip,
        tags: [],
        createdAt: new Date()
      })
      .returning();
    return tip;
  }

  async trackActivity(activity: InsertActivity): Promise<UserActivity> {
    const [newActivity] = await db
      .insert(userActivity)
      .values({
        ...activity,
        createdAt: new Date()
      })
      .returning();
    return newActivity;
  }

  async getUserActivity(username: string): Promise<UserActivity[]> {
    return await db
      .select()
      .from(userActivity)
      .where(eq(userActivity.username, username))
      .orderBy(userActivity.createdAt);
  }
}

export const storage = new DatabaseStorage();
