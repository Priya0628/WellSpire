"""
Wellness content and tips management endpoints
"""

from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, desc

from ....core.database import get_db
from ....models.wellness import WellnessTip, UserActivity, WellnessCategoryEnum
from ....models.user import User
from ....schemas.wellness import (
    WellnessTip as WellnessTipSchema,
    WellnessTipCreate,
    WellnessTipUpdate,
    WellnessTipWithAuthor,
    UserActivityCreate,
    CategoryInsights
)
from ....services.wellness_service import WellnessService
from ....services.recommendation_engine import RecommendationEngine
from .auth import get_current_user

router = APIRouter()

@router.get("/tips", response_model=List[WellnessTipWithAuthor])
async def get_wellness_tips(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    category: Optional[WellnessCategoryEnum] = None,
    search: Optional[str] = None,
    sort_by: str = Query("created_at", regex="^(created_at|likes_count|views_count)$"),
    order: str = Query("desc", regex="^(asc|desc)$"),
    db: AsyncSession = Depends(get_db)
):
    """Get wellness tips with filtering and pagination"""
    wellness_service = WellnessService(db)
    
    tips = await wellness_service.get_tips(
        skip=skip,
        limit=limit,
        category=category,
        search=search,
        sort_by=sort_by,
        order=order
    )
    
    return tips

@router.post("/tips", response_model=WellnessTipSchema, status_code=status.HTTP_201_CREATED)
async def create_wellness_tip(
    tip_data: WellnessTipCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Create a new wellness tip"""
    wellness_service = WellnessService(db)
    
    tip = await wellness_service.create_tip(tip_data, current_user.id)
    
    # Track user activity
    await wellness_service.track_activity(
        user_id=current_user.id,
        activity_type="create_tip",
        category=tip_data.category,
        content_id=str(tip.id)
    )
    
    return tip

@router.get("/tips/{tip_id}", response_model=WellnessTipWithAuthor)
async def get_wellness_tip(
    tip_id: int,
    current_user: Optional[User] = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get specific wellness tip by ID"""
    wellness_service = WellnessService(db)
    
    tip = await wellness_service.get_tip_by_id(tip_id)
    if not tip:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Wellness tip not found"
        )
    
    # Track view activity if user is authenticated
    if current_user:
        await wellness_service.track_activity(
            user_id=current_user.id,
            activity_type="view_content",
            category=tip.category,
            content_id=str(tip_id)
        )
        
        # Increment view count
        await wellness_service.increment_views(tip_id)
    
    return tip

@router.put("/tips/{tip_id}", response_model=WellnessTipSchema)
async def update_wellness_tip(
    tip_id: int,
    tip_update: WellnessTipUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Update wellness tip (only by author)"""
    wellness_service = WellnessService(db)
    
    # Check if tip exists and user is the author
    tip = await wellness_service.get_tip_by_id(tip_id)
    if not tip:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Wellness tip not found"
        )
    
    if tip.author_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to update this tip"
        )
    
    updated_tip = await wellness_service.update_tip(tip_id, tip_update)
    return updated_tip

@router.delete("/tips/{tip_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_wellness_tip(
    tip_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Delete wellness tip (only by author)"""
    wellness_service = WellnessService(db)
    
    # Check if tip exists and user is the author
    tip = await wellness_service.get_tip_by_id(tip_id)
    if not tip:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Wellness tip not found"
        )
    
    if tip.author_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to delete this tip"
        )
    
    await wellness_service.delete_tip(tip_id)

@router.post("/tips/{tip_id}/like", status_code=status.HTTP_200_OK)
async def like_wellness_tip(
    tip_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Like a wellness tip"""
    wellness_service = WellnessService(db)
    
    # Check if tip exists
    tip = await wellness_service.get_tip_by_id(tip_id)
    if not tip:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Wellness tip not found"
        )
    
    # Track like activity
    await wellness_service.track_activity(
        user_id=current_user.id,
        activity_type="like_tip",
        category=tip.category,
        content_id=str(tip_id)
    )
    
    # Increment like count
    await wellness_service.increment_likes(tip_id)
    
    return {"message": "Tip liked successfully"}

@router.get("/categories/{category}/insights", response_model=CategoryInsights)
async def get_category_insights(
    category: WellnessCategoryEnum,
    db: AsyncSession = Depends(get_db)
):
    """Get analytics insights for a wellness category"""
    recommendation_engine = RecommendationEngine()
    insights = await recommendation_engine.get_category_insights(db, category)
    return insights

@router.get("/recommendations", response_model=List[dict])
async def get_personalized_recommendations(
    category: Optional[WellnessCategoryEnum] = None,
    limit: int = Query(6, ge=1, le=20),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get personalized content recommendations"""
    recommendation_engine = RecommendationEngine()
    
    recommendations = await recommendation_engine.get_personalized_recommendations(
        db=db,
        user_id=current_user.id,
        category=category,
        limit=limit
    )
    
    # Track recommendation view activity
    wellness_service = WellnessService(db)
    await wellness_service.track_activity(
        user_id=current_user.id,
        activity_type="view_category" if category else "view_content",
        category=category,
        metadata={"recommendation_count": len(recommendations)}
    )
    
    return recommendations

@router.post("/activity", status_code=status.HTTP_201_CREATED)
async def track_user_activity(
    activity_data: UserActivityCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Track user activity for analytics"""
    wellness_service = WellnessService(db)
    
    activity = await wellness_service.track_activity(
        user_id=current_user.id,
        activity_type=activity_data.activity_type,
        category=activity_data.category,
        content_id=activity_data.content_id,
        metadata=activity_data.metadata,
        session_id=activity_data.session_id
    )
    
    return {"message": "Activity tracked successfully", "activity_id": activity.id}