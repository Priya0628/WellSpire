import { users, tips, type User, type InsertUser, type Tip, type InsertTip } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getTips(): Promise<Tip[]>;
  createTip(tip: InsertTip): Promise<Tip>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private tips: Map<number, Tip>;
  private currentUserId: number;
  private currentTipId: number;

  constructor() {
    this.users = new Map();
    this.tips = new Map();
    this.currentUserId = 1;
    this.currentTipId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getTips(): Promise<Tip[]> {
    return Array.from(this.tips.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async createTip(insertTip: InsertTip): Promise<Tip> {
    const id = this.currentTipId++;
    const tip: Tip = { 
      ...insertTip, 
      id, 
      createdAt: new Date()
    };
    this.tips.set(id, tip);
    return tip;
  }
}

export const storage = new MemStorage();
