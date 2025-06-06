# Wellspire API - FastAPI Backend

Enterprise-grade wellness platform backend built with FastAPI, featuring AI-powered recommendations, user authentication, and comprehensive wellness content management.

## 🏗️ Architecture Overview

```
backend/
├── app/
│   ├── api/v1/                 # API routes and endpoints
│   │   ├── endpoints/          # Individual endpoint modules
│   │   │   ├── auth.py         # Authentication & user management
│   │   │   ├── wellness.py     # Wellness tips & content
│   │   │   └── chatbot.py      # AI chatbot endpoints
│   │   └── api.py             # API router aggregation
│   ├── core/                   # Core application configuration
│   │   ├── config.py          # Settings and configuration
│   │   ├── database.py        # Database connection & session
│   │   └── security.py        # JWT tokens & password hashing
│   ├── models/                 # SQLAlchemy ORM models
│   │   ├── user.py            # User model with profiles
│   │   ├── wellness.py        # Wellness tips & activities
│   │   └── recommendation.py  # AI recommendation models
│   ├── schemas/                # Pydantic schemas for validation
│   │   ├── user.py            # User request/response schemas
│   │   ├── wellness.py        # Wellness content schemas
│   │   └── chatbot.py         # Chatbot interaction schemas
│   ├── services/               # Business logic layer
│   │   ├── user_service.py    # User management operations
│   │   ├── wellness_service.py # Wellness content operations
│   │   ├── recommendation_engine.py # AI recommendations
│   │   └── chatbot_service.py # AI chatbot logic
│   ├── utils/                  # Utility functions
│   │   ├── analytics.py       # Data analytics utilities
│   │   ├── validators.py      # Custom validation logic
│   │   └── helpers.py         # General helper functions
│   └── tests/                  # Comprehensive test suite
│       ├── test_auth.py       # Authentication tests
│       ├── test_wellness.py   # Wellness API tests
│       └── test_recommendations.py # AI recommendation tests
├── alembic/                    # Database migrations
├── main.py                     # FastAPI application entry point
└── requirements.txt            # Python dependencies
```

## 🚀 Features

### Authentication & Security
- JWT-based authentication with refresh tokens
- Password hashing with bcrypt
- Role-based access control
- Session management
- API rate limiting

### Wellness Content Management
- CRUD operations for wellness tips
- Category-based content organization
- Advanced search and filtering
- Content engagement tracking (likes, views, shares)
- User activity analytics

### AI-Powered Recommendations
- Personalized content suggestions
- User behavior analysis
- OpenAI GPT integration for intelligent recommendations
- Fallback algorithmic recommendations
- Real-time recommendation engine

### Analytics & Insights
- User engagement metrics
- Content performance analytics
- Category-wise insights
- Trending content identification
- User activity tracking

### Chatbot Integration
- AI-powered wellness assistant
- Context-aware conversations
- Multi-turn dialogue support
- Wellness expertise across all categories
- Fallback pattern-based responses

## 🛠️ Technology Stack

- **Framework**: FastAPI 0.104+
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Authentication**: JWT tokens with python-jose
- **AI Integration**: OpenAI GPT-4 for recommendations & chatbot
- **Caching**: Redis for session management
- **Background Tasks**: Celery for async processing
- **Testing**: Pytest with async support
- **Documentation**: Auto-generated OpenAPI/Swagger docs

## 📦 Installation & Setup

### Prerequisites
- Python 3.9+
- PostgreSQL 13+
- Redis (optional, for caching)

### Environment Setup

1. **Clone and setup virtual environment**:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
# or
venv\Scripts\activate     # Windows
```

2. **Install dependencies**:
```bash
pip install -r requirements.txt
```

3. **Environment variables** (create `.env` file):
```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/wellspire

# Security
SECRET_KEY=your-super-secret-key-change-in-production
ACCESS_TOKEN_EXPIRE_MINUTES=30

# AI Services
OPENAI_API_KEY=your-openai-api-key

# Redis (optional)
REDIS_URL=redis://localhost:6379

# CORS
ALLOWED_HOSTS=["http://localhost:3000", "http://localhost:5173"]
```

4. **Database setup**:
```bash
# Initialize Alembic
alembic init alembic

# Create first migration
alembic revision --autogenerate -m "Initial migration"

# Apply migrations
alembic upgrade head
```

5. **Run the application**:
```bash
# Development
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Production
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

## 📚 API Documentation

### Interactive Documentation
- **Swagger UI**: `http://localhost:8000/api/docs`
- **ReDoc**: `http://localhost:8000/api/redoc`

### Key Endpoints

#### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/refresh` - Refresh access token
- `GET /api/v1/auth/me` - Get current user profile

#### Wellness Content
- `GET /api/v1/wellness/tips` - Get wellness tips (with filtering)
- `POST /api/v1/wellness/tips` - Create new tip
- `GET /api/v1/wellness/tips/{id}` - Get specific tip
- `PUT /api/v1/wellness/tips/{id}` - Update tip
- `DELETE /api/v1/wellness/tips/{id}` - Delete tip
- `POST /api/v1/wellness/tips/{id}/like` - Like a tip

#### Recommendations
- `GET /api/v1/wellness/recommendations` - Get personalized recommendations
- `GET /api/v1/wellness/categories/{category}/insights` - Category analytics

#### Activity Tracking
- `POST /api/v1/wellness/activity` - Track user activity

#### Chatbot
- `POST /api/v1/chatbot/chat` - Send message to AI assistant
- `GET /api/v1/chatbot/history` - Get chat history

## 🧪 Testing

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=app --cov-report=html

# Run specific test file
pytest tests/test_wellness.py -v
```

## 🔧 Configuration

### Database Models
- **User**: Authentication, profile, preferences
- **WellnessTip**: Community-generated content
- **UserActivity**: Behavior tracking for recommendations
- **WellnessCategory**: Content categorization
- **UserPreference**: AI recommendation tuning

### Service Layer Pattern
- **UserService**: User management operations
- **WellnessService**: Content management
- **RecommendationEngine**: AI-powered suggestions
- **ChatbotService**: Conversational AI

### Security Features
- Password hashing with bcrypt
- JWT tokens with configurable expiration
- CORS protection
- Input validation with Pydantic
- SQL injection prevention with SQLAlchemy ORM

## 🚀 Deployment

### Docker Deployment
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Production Considerations
- Use environment-specific configuration files
- Set up proper logging with structured logs
- Configure monitoring with health check endpoints
- Use connection pooling for database
- Set up Redis for caching and sessions
- Configure rate limiting and request timeouts

## 📊 Performance & Monitoring

### Health Checks
- `GET /health` - Application health status
- Database connection monitoring
- External service availability checks

### Metrics Collection
- Request/response metrics
- Database query performance
- AI service response times
- User engagement analytics

## 🤝 Development Guidelines

### Code Quality
- Type hints for all functions
- Comprehensive docstrings
- Async/await patterns for I/O operations
- Dependency injection for testability
- Service layer separation

### API Design Principles
- RESTful resource naming
- Consistent response formats
- Proper HTTP status codes
- Comprehensive error handling
- Version-aware endpoint design