import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Dynamic imports to avoid module resolution issues in serverless
    const { Pool, neonConfig } = await import('@neondatabase/serverless');
    const { drizzle } = await import('drizzle-orm/neon-serverless');
    const { desc } = await import('drizzle-orm');
    const ws = await import('ws');
    const schema = await import('../shared/schema');

    neonConfig.webSocketConstructor = ws.default;
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const db = drizzle({ client: pool, schema });

    if (req.method === 'GET') {
      const tips = await db.select().from(schema.tips).orderBy(desc(schema.tips.createdAt));
      return res.json(tips);
    }

    if (req.method === 'POST') {
      const { content, category, username } = req.body;
      
      if (!content || !category || !username) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const [tip] = await db
        .insert(schema.tips)
        .values({
          content,
          category,
          username,
          tags: [],
        })
        .returning();

      await db.insert(schema.userActivity).values({
        username,
        action: 'create_tip',
        category,
      });

      return res.status(201).json(tip);
    }

    return res.status(405).json({ message: 'Method not allowed' });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}