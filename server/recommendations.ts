import OpenAI from "openai";
import { storage } from "./storage";
import { getCategoryContent } from "../client/src/lib/videos";

// Initialize OpenAI client securely
const openai = process.env.OPENAI_API_KEY ? new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY 
}) : null;

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  source: string;
  type: "channel" | "article" | "tip";
  category: string;
  relevanceScore: number;
  url?: string;
  subscribers?: string;
}

export class RecommendationService {
  
  /**
   * Get personalized recommendations for a user based on their activity
   * Implements privacy-first approach - no data leaves our system unless AI is available
   */
  async getPersonalizedRecommendations(username: string, category?: string): Promise<Recommendation[]> {
    try {
      // Get user activity securely
      const userActivity = await storage.getUserActivity(username);
      
      // If no AI available, return category-based recommendations
      if (!openai) {
        return this.getFallbackRecommendations(category, userActivity);
      }

      // Analyze user patterns with AI (secure processing)
      const recommendations = await this.generateAIRecommendations(userActivity, category);
      
      return recommendations;
    } catch (error) {
      console.error('Error generating recommendations:', error);
      // Always have secure fallback
      return this.getFallbackRecommendations(category);
    }
  }

  /**
   * Secure fallback recommendations based on activity patterns
   * No external API calls - uses local data only
   */
  private getFallbackRecommendations(category?: string, userActivity: any[] = []): Recommendation[] {
    const categories = category ? [category] : ['food', 'health', 'workout', 'yoga'];
    const recommendations: Recommendation[] = [];

    categories.forEach(cat => {
      const content = getCategoryContent(cat);
      
      // Select 2-3 most relevant items per category
      const relevant = content.slice(0, 3).map((item, index) => ({
        ...item,
        category: cat,
        relevanceScore: 0.8 - (index * 0.1) // Decreasing relevance
      }));
      
      recommendations.push(...relevant);
    });

    return recommendations.slice(0, 6); // Limit to 6 recommendations
  }

  /**
   * Generate AI-powered recommendations (only when API key is available)
   * Implements secure data handling
   */
  private async generateAIRecommendations(userActivity: any[], category?: string): Promise<Recommendation[]> {
    if (!openai) {
      return this.getFallbackRecommendations(category, userActivity);
    }

    try {
      // Analyze user patterns securely (no personal data sent to AI)
      const categoryFrequency = this.analyzeUserInterests(userActivity);
      const prompt = this.buildSecurePrompt(categoryFrequency, category);

      const response = await openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        messages: [
          {
            role: "system",
            content: "You are a wellness content curator. Provide personalized recommendations based on user interests. Respond with JSON only."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        max_tokens: 1000
      });

      const aiSuggestions = JSON.parse(response.choices[0].message.content || '{}');
      return this.formatAIRecommendations(aiSuggestions);
      
    } catch (error) {
      console.error('AI recommendation error:', error);
      return this.getFallbackRecommendations(category, userActivity);
    }
  }

  /**
   * Securely analyze user interests without exposing personal data
   */
  private analyzeUserInterests(userActivity: any[]): Record<string, number> {
    const interests: Record<string, number> = {};
    
    userActivity.forEach(activity => {
      if (activity.category) {
        interests[activity.category] = (interests[activity.category] || 0) + 1;
      }
    });

    return interests;
  }

  /**
   * Build AI prompt with anonymized data only
   */
  private buildSecurePrompt(categoryFrequency: Record<string, number>, targetCategory?: string): string {
    const topCategories = Object.entries(categoryFrequency)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([cat]) => cat);

    return `
      User shows interest in wellness categories: ${topCategories.join(', ')}
      ${targetCategory ? `Currently viewing: ${targetCategory}` : ''}
      
      Recommend 4-6 wellness content items from these categories: food, health, workout, yoga
      
      Focus on:
      - Beginner-friendly content
      - Positive, supportive tone
      - Practical tips and trusted channels
      
      Return JSON format:
      {
        "recommendations": [
          {
            "title": "Content title",
            "description": "Brief description",
            "category": "food|health|workout|yoga",
            "type": "channel|tip",
            "relevanceScore": 0.9,
            "source": "Source name"
          }
        ]
      }
    `;
  }

  /**
   * Format AI response into our recommendation structure
   */
  private formatAIRecommendations(aiResponse: any): Recommendation[] {
    if (!aiResponse.recommendations || !Array.isArray(aiResponse.recommendations)) {
      return this.getFallbackRecommendations();
    }

    return aiResponse.recommendations.map((rec: any, index: number) => ({
      id: `ai-${Date.now()}-${index}`,
      title: rec.title || 'Wellness Recommendation',
      description: rec.description || '',
      source: rec.source || 'AI Recommendation',
      type: rec.type || 'tip',
      category: rec.category || 'health',
      relevanceScore: rec.relevanceScore || 0.5,
    }));
  }

  /**
   * Track user activity securely for better recommendations
   */
  async trackUserActivity(username: string, action: string, category?: string, contentId?: string) {
    try {
      await storage.trackActivity({
        username,
        action,
        category: category || null,
        contentId: contentId || null,
      });
    } catch (error) {
      console.error('Error tracking activity:', error);
      // Fail silently - don't break user experience
    }
  }
}

export const recommendationService = new RecommendationService();