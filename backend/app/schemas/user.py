"""
User-related Pydantic schemas for request/response validation
"""

from pydantic import BaseModel, EmailStr, validator
from typing import List, Optional
from datetime import datetime
from enum import Enum

class ExperienceLevelEnum(str, Enum):
    BEGINNER = "beginner"
    INTERMEDIATE = "intermediate"
    ADVANCED = "advanced"

class WellnessGoalEnum(str, Enum):
    WEIGHT_LOSS = "weight_loss"
    MUSCLE_GAIN = "muscle_gain"
    STRESS_RELIEF = "stress_relief"
    BETTER_SLEEP = "better_sleep"
    NUTRITION = "nutrition"
    FLEXIBILITY = "flexibility"
    MENTAL_HEALTH = "mental_health"

# Base schemas
class UserBase(BaseModel):
    username: str
    email: EmailStr
    full_name: Optional[str] = None
    wellness_goals: List[WellnessGoalEnum] = []
    interests: List[str] = []
    experience_level: ExperienceLevelEnum = ExperienceLevelEnum.BEGINNER

class UserCreate(UserBase):
    password: str
    
    @validator('password')
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters long')
        return v

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    wellness_goals: Optional[List[WellnessGoalEnum]] = None
    interests: Optional[List[str]] = None
    experience_level: Optional[ExperienceLevelEnum] = None

class UserInDB(UserBase):
    id: int
    is_active: bool
    is_verified: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    last_login: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class User(UserInDB):
    """Public user schema without sensitive information"""
    pass

class UserProfile(User):
    """Extended user profile with additional statistics"""
    tips_count: int = 0
    total_likes: int = 0
    engagement_score: float = 0.0

# Authentication schemas
class UserLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int

class TokenPayload(BaseModel):
    sub: Optional[str] = None
    exp: Optional[int] = None