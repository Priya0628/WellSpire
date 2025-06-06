"""
Wellspire API - FastAPI Backend
Enterprise-grade wellness platform with AI-powered recommendations
"""

from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from contextlib import asynccontextmanager
import uvicorn
from typing import Optional
import os
from dotenv import load_dotenv

from app.core.config import settings
from app.core.database import engine, create_tables
from app.api.v1.api import api_router
from app.core.security import verify_token
from app.services.recommendation_engine import RecommendationEngine

load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan management"""
    # Startup
    await create_tables()
    print("🚀 Database tables created")
    
    # Initialize services
    app.state.recommendation_engine = RecommendationEngine()
    print("🤖 Recommendation engine initialized")
    
    yield
    
    # Shutdown
    print("🛑 Application shutdown")

app = FastAPI(
    title="Wellspire API",
    description="Enterprise wellness platform with AI-powered recommendations and community features",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    lifespan=lifespan
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_HOSTS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer(auto_error=False)

async def get_current_user(credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)):
    """Extract and validate user from JWT token"""
    if not credentials:
        return None
    
    try:
        payload = verify_token(credentials.credentials)
        return payload.get("sub")
    except Exception:
        return None

# Include API routes
app.include_router(api_router, prefix="/api/v1")

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "version": "1.0.0",
        "service": "wellspire-api"
    }

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Welcome to Wellspire API",
        "docs": "/api/docs",
        "version": "1.0.0"
    }

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )