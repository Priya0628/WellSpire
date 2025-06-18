const { Pool, neonConfig } = require('@neondatabase/serverless');
const ws = require("ws");

neonConfig.webSocketConstructor = ws;

module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });

    if (req.method === 'GET') {
      // Ensure table exists
      await pool.query(`
        CREATE TABLE IF NOT EXISTS tips (
          id SERIAL PRIMARY KEY,
          username VARCHAR(255) NOT NULL,
          category VARCHAR(50) NOT NULL,
          content TEXT NOT NULL,
          tags JSONB DEFAULT '[]'::jsonb,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      
      const result = await pool.query('SELECT id, username, category, content, tags, created_at as "createdAt" FROM tips ORDER BY created_at DESC');
      return res.status(200).json(result.rows);
    }

    if (req.method === 'POST') {
      const { content, category, username } = req.body;
      
      if (!content || !category || !username) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const result = await pool.query(
        'INSERT INTO tips (username, category, content, tags, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING id, username, category, content, tags, created_at as "createdAt"',
        [username, category, content, JSON.stringify([]), new Date()]
      );
      
      return res.status(201).json(result.rows[0]);
    }

    return res.status(405).json({ message: 'Method not allowed' });

  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ 
      message: 'Internal server error',
      error: error.message 
    });
  }
};