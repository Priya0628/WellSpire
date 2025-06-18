import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "../shared/schema";
import OpenAI from "openai";

neonConfig.webSocketConstructor = ws;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle({ client: pool, schema });

const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { message, username } = req.body;
    
    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    let response = "I'm having trouble connecting right now. You can still browse our wellness content and community tips while I get back online!";

    if (openai) {
      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: "You are Wellspire's AI wellness companion. Provide helpful, encouraging wellness advice on topics like nutrition, fitness, mental health, and lifestyle. Keep responses concise, practical, and supportive. Focus on actionable tips and positive guidance."
            },
            {
              role: "user",
              content: message
            }
          ],
          max_tokens: 150,
          temperature: 0.7,
        });

        response = completion.choices[0]?.message?.content || response;
      } catch (error) {
        console.error('OpenAI API error:', error);
      }
    }

    if (username) {
      await db.insert(schema.userActivity).values({
        username,
        action: 'chat_interaction',
      });
    }

    return res.json({ response });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}