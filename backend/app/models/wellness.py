"""
Wellness-related models for tips, activities, and categories
"""

from sqlalchemy import Column, Integer, String, Text, DateTime, JSON, ForeignKey, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import enum
from ..core.database import Base

class WellnessCategoryEnum(str, enum.Enum):
    FOOD = "food"
    HEALTH = "health"
    WORKOUT = "workout"
    YOGA = "yoga"

class ActivityTypeEnum(str, enum.Enum):
    VIEW_CONTENT = "view_content"
    CREATE_TIP = "create_tip"
    LIKE_TIP = "like_tip"
    SHARE_TIP = "share_tip"
    VIEW_CATEGORY = "view_category"
    CHAT_INTERACTION = "chat_interaction"

class WellnessTip(Base):
    __tablename__ = "wellness_tips"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    category = Column(Enum(WellnessCategoryEnum), nullable=False)
    tags = Column(JSON, default=list)
    
    # Author information
    author_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Engagement metrics
    likes_count = Column(Integer, default=0)
    shares_count = Column(Integer, default=0)
    views_count = Column(Integer, default=0)
    
    # Metadata
    source_url = Column(String)  # If tip comes from external source
    is_featured = Column(Integer, default=0)  # Boolean as integer for SQLite compatibility
    difficulty_level = Column(String, default="beginner")
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    author = relationship("User", back_populates="wellness_tips")

class UserActivity(Base):
    __tablename__ = "user_activities"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    activity_type = Column(Enum(ActivityTypeEnum), nullable=False)
    
    # Activity context
    category = Column(Enum(WellnessCategoryEnum))
    content_id = Column(String)  # Generic content identifier
    metadata = Column(JSON, default=dict)  # Additional activity data
    
    # Session tracking
    session_id = Column(String)
    ip_address = Column(String)
    user_agent = Column(Text)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", back_populates="activities")

class WellnessCategory(Base):
    __tablename__ = "wellness_categories"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(Enum(WellnessCategoryEnum), unique=True, nullable=False)
    display_name = Column(String, nullable=False)
    description = Column(Text)
    icon = Column(String)  # Icon name or URL
    color = Column(String)  # Hex color code
    
    # SEO and content
    slug = Column(String, unique=True, nullable=False)
    meta_description = Column(Text)
    featured_content = Column(JSON, default=list)
    
    # Ordering and visibility
    sort_order = Column(Integer, default=0)
    is_active = Column(Integer, default=1)  # Boolean as integer
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())