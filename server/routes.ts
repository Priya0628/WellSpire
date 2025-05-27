import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTipSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all tips
  app.get("/api/tips", async (req, res) => {
    try {
      const tips = await storage.getTips();
      res.json(tips);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tips" });
    }
  });

  // Create a new tip
  app.post("/api/tips", async (req, res) => {
    try {
      const validatedData = insertTipSchema.parse(req.body);
      const tip = await storage.createTip(validatedData);
      res.status(201).json(tip);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid tip data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create tip" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
