"""
Wellness service layer with business logic
"""

from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, desc, asc, or_
from sqlalchemy.orm import selectinload

from ..models.wellness import WellnessTip, UserActivity, WellnessCategoryEnum, ActivityTypeEnum
from ..models.user import User
from ..schemas.wellness import (
    WellnessTipCreate,
    WellnessTipUpdate,
    WellnessTipWithAuthor,
    UserActivity as UserActivitySchema
)

class WellnessService:
    """Service layer for wellness-related operations"""
    
    def __init__(self, db: AsyncSession):
        self.db = db
    
    async def get_tips(
        self,
        skip: int = 0,
        limit: int = 20,
        category: Optional[WellnessCategoryEnum] = None,
        search: Optional[str] = None,
        sort_by: str = "created_at",
        order: str = "desc"
    ) -> List[WellnessTipWithAuthor]:
        """Get wellness tips with filtering and pagination"""
        
        query = select(WellnessTip).options(selectinload(WellnessTip.author))
        
        # Apply category filter
        if category:
            query = query.where(WellnessTip.category == category)
        
        # Apply search filter
        if search:
            search_term = f"%{search}%"
            query = query.where(
                or_(
                    WellnessTip.title.ilike(search_term),
                    WellnessTip.content.ilike(search_term)
                )
            )
        
        # Apply sorting
        sort_column = getattr(WellnessTip, sort_by)
        if order == "desc":
            query = query.order_by(desc(sort_column))
        else:
            query = query.order_by(asc(sort_column))
        
        # Apply pagination
        query = query.offset(skip).limit(limit)
        
        result = await self.db.execute(query)
        tips = result.scalars().all()
        
        # Convert to response schema
        tips_with_author = []
        for tip in tips:
            tip_dict = {
                "id": tip.id,
                "title": tip.title,
                "content": tip.content,
                "category": tip.category,
                "tags": tip.tags or [],
                "author_id": tip.author_id,
                "likes_count": tip.likes_count,
                "shares_count": tip.shares_count,
                "views_count": tip.views_count,
                "is_featured": bool(tip.is_featured),
                "source_url": tip.source_url,
                "difficulty_level": tip.difficulty_level,
                "created_at": tip.created_at,
                "updated_at": tip.updated_at,
                "author_username": tip.author.username,
                "author_full_name": tip.author.full_name
            }
            tips_with_author.append(WellnessTipWithAuthor(**tip_dict))
        
        return tips_with_author
    
    async def get_tip_by_id(self, tip_id: int) -> Optional[WellnessTipWithAuthor]:
        """Get wellness tip by ID"""
        
        query = select(WellnessTip).options(selectinload(WellnessTip.author)).where(WellnessTip.id == tip_id)
        result = await self.db.execute(query)
        tip = result.scalar_one_or_none()
        
        if not tip:
            return None
        
        return WellnessTipWithAuthor(
            id=tip.id,
            title=tip.title,
            content=tip.content,
            category=tip.category,
            tags=tip.tags or [],
            author_id=tip.author_id,
            likes_count=tip.likes_count,
            shares_count=tip.shares_count,
            views_count=tip.views_count,
            is_featured=bool(tip.is_featured),
            source_url=tip.source_url,
            difficulty_level=tip.difficulty_level,
            created_at=tip.created_at,
            updated_at=tip.updated_at,
            author_username=tip.author.username,
            author_full_name=tip.author.full_name
        )
    
    async def create_tip(self, tip_data: WellnessTipCreate, author_id: int) -> WellnessTip:
        """Create new wellness tip"""
        
        tip = WellnessTip(
            title=tip_data.title,
            content=tip_data.content,
            category=tip_data.category,
            tags=tip_data.tags,
            source_url=tip_data.source_url,
            difficulty_level=tip_data.difficulty_level,
            author_id=author_id
        )
        
        self.db.add(tip)
        await self.db.commit()
        await self.db.refresh(tip)
        
        return tip
    
    async def update_tip(self, tip_id: int, tip_update: WellnessTipUpdate) -> WellnessTip:
        """Update existing wellness tip"""
        
        query = select(WellnessTip).where(WellnessTip.id == tip_id)
        result = await self.db.execute(query)
        tip = result.scalar_one()
        
        # Update fields if provided
        if tip_update.title is not None:
            tip.title = tip_update.title
        if tip_update.content is not None:
            tip.content = tip_update.content
        if tip_update.tags is not None:
            tip.tags = tip_update.tags
        if tip_update.source_url is not None:
            tip.source_url = tip_update.source_url
        if tip_update.difficulty_level is not None:
            tip.difficulty_level = tip_update.difficulty_level
        
        await self.db.commit()
        await self.db.refresh(tip)
        
        return tip
    
    async def delete_tip(self, tip_id: int) -> None:
        """Delete wellness tip"""
        
        query = select(WellnessTip).where(WellnessTip.id == tip_id)
        result = await self.db.execute(query)
        tip = result.scalar_one()
        
        await self.db.delete(tip)
        await self.db.commit()
    
    async def increment_likes(self, tip_id: int) -> None:
        """Increment like count for tip"""
        
        query = select(WellnessTip).where(WellnessTip.id == tip_id)
        result = await self.db.execute(query)
        tip = result.scalar_one()
        
        tip.likes_count += 1
        await self.db.commit()
    
    async def increment_views(self, tip_id: int) -> None:
        """Increment view count for tip"""
        
        query = select(WellnessTip).where(WellnessTip.id == tip_id)
        result = await self.db.execute(query)
        tip = result.scalar_one()
        
        tip.views_count += 1
        await self.db.commit()
    
    async def track_activity(
        self,
        user_id: int,
        activity_type: str,
        category: Optional[WellnessCategoryEnum] = None,
        content_id: Optional[str] = None,
        metadata: Optional[dict] = None,
        session_id: Optional[str] = None
    ) -> UserActivity:
        """Track user activity for analytics"""
        
        activity = UserActivity(
            user_id=user_id,
            activity_type=ActivityTypeEnum(activity_type),
            category=category,
            content_id=content_id,
            metadata=metadata or {},
            session_id=session_id
        )
        
        self.db.add(activity)
        await self.db.commit()
        await self.db.refresh(activity)
        
        return activity