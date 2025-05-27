import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTipSchema, insertActivitySchema } from "@shared/schema";
import { recommendationService } from "./recommendations";
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
      
      // Securely track user activity for better recommendations
      await recommendationService.trackUserActivity(
        validatedData.username,
        'create_tip',
        validatedData.category
      );
      
      res.status(201).json(tip);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid tip data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create tip" });
      }
    }
  });

  // Get personalized recommendations
  app.get("/api/recommendations/:username", async (req, res) => {
    try {
      const { username } = req.params;
      const { category } = req.query;
      
      const recommendations = await recommendationService.getPersonalizedRecommendations(
        username,
        category as string
      );
      
      res.json(recommendations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch recommendations" });
    }
  });

  // Track user activity securely
  app.post("/api/activity", async (req, res) => {
    try {
      const validatedData = insertActivitySchema.parse(req.body);
      const activity = await storage.trackActivity(validatedData);
      res.status(201).json(activity);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid activity data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to track activity" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
