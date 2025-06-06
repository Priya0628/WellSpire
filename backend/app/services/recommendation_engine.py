"""
Advanced AI-powered recommendation engine for wellness content
"""

import openai
from typing import List, Dict, Any, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from datetime import datetime, timedelta
import json

from ..core.config import settings
from ..models.wellness import WellnessTip, UserActivity, WellnessCategoryEnum
from ..models.user import User
from ..schemas.wellness import CategoryInsights

class RecommendationEngine:
    """Enterprise-grade recommendation system with AI and analytics"""
    
    def __init__(self):
        self.client = None
        if settings.OPENAI_API_KEY:
            self.client = openai.AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
    
    async def get_personalized_recommendations(
        self,
        db: AsyncSession,
        user_id: int,
        category: Optional[WellnessCategoryEnum] = None,
        limit: int = 6
    ) -> List[Dict[str, Any]]:
        """Generate personalized recommendations using AI and user behavior analysis"""
        
        # Analyze user behavior patterns
        user_profile = await self._analyze_user_behavior(db, user_id)
        
        # Get content recommendations
        if self.client and settings.OPENAI_API_KEY:
            recommendations = await self._generate_ai_recommendations(
                user_profile, category, limit
            )
        else:
            recommendations = await self._generate_algorithmic_recommendations(
                db, user_profile, category, limit
            )
        
        return recommendations
    
    async def _analyze_user_behavior(
        self, 
        db: AsyncSession, 
        user_id: int
    ) -> Dict[str, Any]:
        """Analyze user behavior patterns for personalization"""
        
        # Get user preferences
        user_query = select(User).where(User.id == user_id)
        user_result = await db.execute(user_query)
        user = user_result.scalar_one_or_none()
        
        if not user:
            return {"interests": [], "experience_level": "beginner", "activity_patterns": {}}
        
        # Analyze recent activity (last 30 days)
        thirty_days_ago = datetime.utcnow() - timedelta(days=30)
        activity_query = select(
            UserActivity.category,
            func.count(UserActivity.id).label('count')
        ).where(
            UserActivity.user_id == user_id,
            UserActivity.created_at >= thirty_days_ago
        ).group_by(UserActivity.category)
        
        activity_result = await db.execute(activity_query)
        activity_patterns = {row.category: row.count for row in activity_result.fetchall()}
        
        return {
            "interests": user.interests or [],
            "wellness_goals": user.wellness_goals or [],
            "experience_level": user.experience_level,
            "activity_patterns": activity_patterns
        }
    
    async def _generate_ai_recommendations(
        self,
        user_profile: Dict[str, Any],
        category: Optional[WellnessCategoryEnum] = None,
        limit: int = 6
    ) -> List[Dict[str, Any]]:
        """Generate recommendations using OpenAI"""
        
        prompt = self._build_recommendation_prompt(user_profile, category, limit)
        
        try:
            response = await self.client.chat.completions.create(
                model=settings.AI_MODEL,
                messages=[
                    {
                        "role": "system",
                        "content": "You are an expert wellness content curator. Generate personalized wellness recommendations based on user behavior and preferences. Respond only with valid JSON."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                response_format={"type": "json_object"},
                max_tokens=settings.MAX_TOKENS,
                temperature=settings.TEMPERATURE
            )
            
            result = json.loads(response.choices[0].message.content)
            return result.get("recommendations", [])
            
        except Exception as e:
            print(f"AI recommendation error: {e}")
            return await self._generate_fallback_recommendations(user_profile, category, limit)
    
    def _build_recommendation_prompt(
        self,
        user_profile: Dict[str, Any],
        category: Optional[WellnessCategoryEnum] = None,
        limit: int = 6
    ) -> str:
        """Build AI prompt for recommendations"""
        
        interests = ", ".join(user_profile.get("interests", []))
        goals = ", ".join(user_profile.get("wellness_goals", []))
        experience = user_profile.get("experience_level", "beginner")
        
        category_filter = f"Focus specifically on {category} category." if category else ""
        
        return f"""
        Generate {limit} personalized wellness content recommendations for a user with:
        - Interests: {interests}
        - Wellness goals: {goals}
        - Experience level: {experience}
        
        {category_filter}
        
        Categories available: food, health, workout, yoga
        
        Return JSON format:
        {{
            "recommendations": [
                {{
                    "title": "Content title",
                    "description": "Brief description focusing on practical benefits",
                    "category": "food|health|workout|yoga",
                    "type": "tip|channel|article",
                    "relevance_score": 0.95,
                    "tags": ["tag1", "tag2"],
                    "difficulty": "beginner|intermediate|advanced",
                    "source": "Trusted source name"
                }}
            ]
        }}
        
        Focus on:
        - Beginner-friendly content for new users
        - Evidence-based wellness practices
        - Practical, actionable advice
        - Positive, supportive tone
        """
    
    async def _generate_algorithmic_recommendations(
        self,
        db: AsyncSession,
        user_profile: Dict[str, Any],
        category: Optional[WellnessCategoryEnum] = None,
        limit: int = 6
    ) -> List[Dict[str, Any]]:
        """Generate recommendations using algorithmic approach"""
        
        # Get popular content based on engagement
        query = select(WellnessTip).order_by(
            (WellnessTip.likes_count + WellnessTip.views_count).desc()
        )
        
        if category:
            query = query.where(WellnessTip.category == category)
        
        query = query.limit(limit)
        result = await db.execute(query)
        tips = result.scalars().all()
        
        recommendations = []
        for tip in tips:
            recommendations.append({
                "id": f"tip_{tip.id}",
                "title": tip.title,
                "description": tip.content[:200] + "..." if len(tip.content) > 200 else tip.content,
                "category": tip.category,
                "type": "tip",
                "relevance_score": min(0.9, (tip.likes_count + tip.views_count) / 100),
                "tags": tip.tags or [],
                "difficulty": tip.difficulty_level,
                "source": "Community"
            })
        
        return recommendations
    
    async def _generate_fallback_recommendations(
        self,
        user_profile: Dict[str, Any],
        category: Optional[WellnessCategoryEnum] = None,
        limit: int = 6
    ) -> List[Dict[str, Any]]:
        """Fallback recommendations when AI is unavailable"""
        
        fallback_content = {
            "food": [
                {
                    "title": "Start Your Day with Protein",
                    "description": "Include 20-30g of protein in breakfast to maintain stable energy levels throughout the day",
                    "category": "food",
                    "type": "tip",
                    "relevance_score": 0.8,
                    "tags": ["nutrition", "breakfast", "protein"],
                    "difficulty": "beginner",
                    "source": "Nutrition Science"
                },
                {
                    "title": "Rainbow Plant Life",
                    "description": "Vibrant plant-based recipes and nutrition education for healthy eating",
                    "category": "food",
                    "type": "channel",
                    "relevance_score": 0.9,
                    "tags": ["plant-based", "recipes", "nutrition"],
                    "difficulty": "beginner",
                    "source": "YouTube Channel"
                }
            ],
            "health": [
                {
                    "title": "Daily Gratitude Practice",
                    "description": "Write down 3 things you're grateful for each day to improve mood and life satisfaction",
                    "category": "health",
                    "type": "tip",
                    "relevance_score": 0.85,
                    "tags": ["mental-health", "gratitude", "wellness"],
                    "difficulty": "beginner",
                    "source": "Psychology Research"
                }
            ],
            "workout": [
                {
                    "title": "10-Minute Movement Rule",
                    "description": "Start with just 10 minutes of daily movement - consistency matters more than duration",
                    "category": "workout",
                    "type": "tip",
                    "relevance_score": 0.9,
                    "tags": ["exercise", "beginner", "consistency"],
                    "difficulty": "beginner",
                    "source": "Fitness Science"
                }
            ],
            "yoga": [
                {
                    "title": "Box Breathing Technique",
                    "description": "Breathe in for 4, hold for 4, out for 4, hold for 4. Repeat to reduce anxiety instantly",
                    "category": "yoga",
                    "type": "tip",
                    "relevance_score": 0.95,
                    "tags": ["breathing", "mindfulness", "anxiety"],
                    "difficulty": "beginner",
                    "source": "Mindfulness Practice"
                }
            ]
        }
        
        if category:
            return fallback_content.get(category, [])[:limit]
        
        # Mix from all categories
        all_content = []
        for cat_content in fallback_content.values():
            all_content.extend(cat_content)
        
        return all_content[:limit]
    
    async def get_category_insights(
        self, 
        db: AsyncSession, 
        category: WellnessCategoryEnum
    ) -> CategoryInsights:
        """Generate analytics insights for a wellness category"""
        
        # Get category statistics
        tips_query = select(func.count(WellnessTip.id)).where(
            WellnessTip.category == category
        )
        tips_count = await db.scalar(tips_query)
        
        # Get engagement metrics
        engagement_query = select(
            func.sum(WellnessTip.views_count).label('total_views'),
            func.sum(WellnessTip.likes_count).label('total_likes'),
            func.avg(WellnessTip.likes_count + WellnessTip.views_count).label('avg_engagement')
        ).where(WellnessTip.category == category)
        
        engagement_result = await db.execute(engagement_query)
        engagement_data = engagement_result.fetchone()
        
        return CategoryInsights(
            category=category,
            total_tips=tips_count or 0,
            total_views=engagement_data.total_views or 0,
            total_likes=engagement_data.total_likes or 0,
            avg_engagement=float(engagement_data.avg_engagement or 0),
            top_tags=["wellness", "health", "tips"],  # Could be computed from actual data
            trending_score=0.8
        )