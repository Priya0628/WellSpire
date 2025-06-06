# Wellspire - AI-Powered Wellness Platform

A comprehensive wellness platform that combines AI-powered interactions, community-driven content, and curated wellness resources across four key categories: Food & Nutrition, Health & Wellness, Workout & Exercise, and Yoga & Mindfulness.

## Features

- **AI-Powered Chatbot**: OpenAI GPT-4 powered wellness assistant with intelligent fallback system
- **Smart Recommendations**: Personalized content recommendations based on user activity
- **Community Tips**: User-generated wellness tips with category filtering
- **Curated Content**: Hand-picked YouTube channels and wellness resources
- **Enterprise Backend**: PostgreSQL database with Drizzle ORM
- **Modern Frontend**: React with TypeScript, Tailwind CSS, and shadcn/ui components

## Tech Stack

### Frontend
- React 18 with TypeScript
- Wouter for routing
- TanStack Query for state management
- Tailwind CSS + shadcn/ui for styling
- Framer Motion for animations

### Backend
- Node.js with Express
- PostgreSQL with Drizzle ORM
- OpenAI GPT-4 integration
- Secure user activity tracking

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- OpenAI API key (optional, for AI features)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/wellspire.git
cd wellspire
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
- `DATABASE_URL`: Your PostgreSQL connection string
- `OPENAI_API_KEY`: Your OpenAI API key (optional)

4. Set up the database:
```bash
npm run db:push
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `OPENAI_API_KEY` | OpenAI API key for AI features | No |
| `PGHOST` | PostgreSQL host | Auto-configured |
| `PGPORT` | PostgreSQL port | Auto-configured |
| `PGUSER` | PostgreSQL username | Auto-configured |
| `PGPASSWORD` | PostgreSQL password | Auto-configured |
| `PGDATABASE` | PostgreSQL database name | Auto-configured |

## Deployment

### Production Build

1. Build the application:
```bash
npm run build
```

2. Start in production mode:
```bash
npm start
```

### Deploy to Cloud Platforms

The application is configured for deployment on:
- Railway
- Render
- Heroku
- Vercel
- Netlify

Make sure to set the required environment variables in your deployment platform.

## API Endpoints

- `GET /api/tips` - Fetch all wellness tips
- `POST /api/tips` - Create a new tip
- `GET /api/recommendations/:username` - Get personalized recommendations
- `POST /api/activity` - Track user activity
- `POST /api/chatbot` - Chat with AI wellness assistant

## Project Structure

```
wellspire/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── lib/            # Utility functions
│   │   └── hooks/          # Custom React hooks
├── server/                 # Express backend
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── db.ts              # Database connection
│   ├── storage.ts         # Data access layer
│   ├── chatbot.ts         # AI chatbot logic
│   └── recommendations.ts # Recommendation engine
├── shared/                # Shared types and schemas
│   └── schema.ts          # Database schema
└── package.json           # Dependencies and scripts
```

## Features Overview

### AI Wellness Assistant
- Powered by OpenAI GPT-4
- Intelligent fallback responses when API is unavailable
- Personalized wellness guidance
- Supportive, non-judgmental tone

### Smart Recommendations
- Activity-based content suggestions
- AI-powered personalization
- Privacy-first approach
- Secure data handling

### Content Categories
- **Food & Nutrition**: Healthy recipes, meal planning, nutrition tips
- **Health & Wellness**: General health advice, lifestyle tips
- **Workout & Exercise**: Fitness routines, exercise guides
- **Yoga & Mindfulness**: Meditation, yoga practices, mental wellness

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@wellspire.com or open an issue on GitHub.