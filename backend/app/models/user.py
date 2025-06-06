"""
User model for authentication and profile management
"""

from sqlalchemy import Column, Integer, String, DateTime, JSON, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..core.database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String)
    
    # Profile information
    wellness_goals = Column(JSON, default=list)  # ["weight_loss", "stress_relief", etc.]
    interests = Column(JSON, default=list)  # ["nutrition", "yoga", etc.]
    experience_level = Column(String, default="beginner")  # beginner, intermediate, advanced
    
    # Account status
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    last_login = Column(DateTime(timezone=True))
    
    # Relationships
    wellness_tips = relationship("WellnessTip", back_populates="author")
    activities = relationship("UserActivity", back_populates="user")
    preferences = relationship("UserPreference", back_populates="user")