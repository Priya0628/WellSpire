"""
Wellness-related Pydantic schemas
"""

from pydantic import BaseModel, validator
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum

from ..models.wellness import WellnessCategoryEnum, ActivityTypeEnum

# Wellness Tip Schemas
class WellnessTipBase(BaseModel):
    title: str
    content: str
    category: WellnessCategoryEnum
    tags: List[str] = []
    source_url: Optional[str] = None
    difficulty_level: str = "beginner"

class WellnessTipCreate(WellnessTipBase):
    @validator('content')
    def validate_content(cls, v):
        if len(v.strip()) < 10:
            raise ValueError('Content must be at least 10 characters long')
        return v.strip()

class WellnessTipUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    tags: Optional[List[str]] = None
    source_url: Optional[str] = None
    difficulty_level: Optional[str] = None

class WellnessTip(WellnessTipBase):
    id: int
    author_id: int
    likes_count: int
    shares_count: int
    views_count: int
    is_featured: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class WellnessTipWithAuthor(WellnessTip):
    author_username: str
    author_full_name: Optional[str] = None

# User Activity Schemas
class UserActivityBase(BaseModel):
    activity_type: ActivityTypeEnum
    category: Optional[WellnessCategoryEnum] = None
    content_id: Optional[str] = None
    metadata: Dict[str, Any] = {}

class UserActivityCreate(UserActivityBase):
    session_id: Optional[str] = None

class UserActivity(UserActivityBase):
    id: int
    user_id: int
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None
    created_at: datetime
    
    class Config:
        from_attributes = True

# Category Schemas
class WellnessCategoryBase(BaseModel):
    name: WellnessCategoryEnum
    display_name: str
    description: Optional[str] = None
    icon: Optional[str] = None
    color: Optional[str] = None
    slug: str
    meta_description: Optional[str] = None

class WellnessCategoryCreate(WellnessCategoryBase):
    pass

class WellnessCategoryUpdate(BaseModel):
    display_name: Optional[str] = None
    description: Optional[str] = None
    icon: Optional[str] = None
    color: Optional[str] = None
    meta_description: Optional[str] = None
    sort_order: Optional[int] = None
    is_active: Optional[bool] = None

class WellnessCategory(WellnessCategoryBase):
    id: int
    featured_content: List[Dict[str, Any]] = []
    sort_order: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# Analytics and Insights
class CategoryInsights(BaseModel):
    category: WellnessCategoryEnum
    total_tips: int
    total_views: int
    total_likes: int
    avg_engagement: float
    top_tags: List[str]
    trending_score: float

class UserEngagementStats(BaseModel):
    user_id: int
    total_tips_created: int
    total_likes_received: int
    total_views: int
    favorite_categories: List[WellnessCategoryEnum]
    engagement_score: float
    streak_days: int