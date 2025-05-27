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
    
    // Add some inspiring sample tips
    this.initializeSampleTips();
  }

  private initializeSampleTips() {
    const sampleTips = [
      {
        username: "Sarah M.",
        category: "health",
        content: "I started setting a gentle alarm to drink water every 2 hours. It's amazing how much better I feel when I'm properly hydrated!"
      },
      {
        username: "Mike T.",
        category: "workout",
        content: "Instead of thinking 'I have to work out for an hour,' I tell myself 'just 10 minutes.' Usually I end up doing more, but even 10 minutes counts!"
      },
      {
        username: "Emma K.",
        category: "food",
        content: "I prep my snacks on Sunday - cut veggies, portion nuts, wash fruit. When I'm hungry, the healthy option is always the easiest to grab."
      },
      {
        username: "David L.",
        category: "yoga",
        content: "Even 5 minutes of deep breathing in the morning sets a peaceful tone for my entire day. No need for a full yoga session to feel centered."
      },
      {
        username: "Lisa R.",
        category: "health",
        content: "I write down 3 things I'm grateful for before bed. It's shifted my mindset from focusing on what went wrong to appreciating what went right."
      },
      {
        username: "Alex P.",
        category: "food",
        content: "I add a handful of spinach to my smoothies. Can't taste it at all, but I know I'm getting extra nutrients without any effort!"
      }
    ];

    sampleTips.forEach(tip => {
      const id = this.currentTipId++;
      const tipWithTimestamp = {
        ...tip,
        id,
        createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) // Random time within last week
      };
      this.tips.set(id, tipWithTimestamp);
    });
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
