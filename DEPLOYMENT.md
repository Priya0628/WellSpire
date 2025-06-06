# Deployment Guide for Wellspire

This guide covers deploying Wellspire to various cloud platforms using your GitHub repository.

## Prerequisites

1. **GitHub Repository**: Push your code to GitHub
2. **PostgreSQL Database**: Set up a database on your chosen platform
3. **OpenAI API Key** (Optional): For AI chatbot features

## Platform-Specific Deployment

### Railway (Recommended)

Railway offers seamless PostgreSQL integration and GitHub deployment.

1. **Connect GitHub**:
   - Visit [railway.app](https://railway.app)
   - Click "Start a New Project"
   - Select "Deploy from GitHub repo"
   - Choose your Wellspire repository

2. **Configure Environment**:
   - Railway will auto-detect the Node.js project
   - Add PostgreSQL service: Click "Add Service" → "Database" → "PostgreSQL"
   - Set environment variables:
     ```
     DATABASE_URL: ${{Postgres.DATABASE_URL}}
     OPENAI_API_KEY: your_openai_key_here
     NODE_ENV: production
     ```

3. **Deploy**:
   - Railway will automatically build and deploy
   - Your app will be available at: `https://your-app.railway.app`

### Render

1. **Create Web Service**:
   - Visit [render.com](https://render.com)
   - Click "New" → "Web Service"
   - Connect your GitHub repository

2. **Configure Build**:
   - Build Command: `npm ci && npm run build`
   - Start Command: `npm start`
   - Node Version: 18

3. **Add PostgreSQL**:
   - Create a new PostgreSQL database
   - Copy the connection string

4. **Environment Variables**:
   ```
   DATABASE_URL: your_postgres_connection_string
   OPENAI_API_KEY: your_openai_key_here
   NODE_ENV: production
   ```

### Vercel

1. **Import Project**:
   - Visit [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository

2. **Configure**:
   - Framework Preset: Other
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Add PostgreSQL**:
   - Use Vercel Postgres or external provider
   - Add DATABASE_URL to environment variables

### Heroku

1. **Create App**:
   ```bash
   heroku create your-app-name
   heroku addons:create heroku-postgresql:mini
   ```

2. **Configure**:
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set OPENAI_API_KEY=your_key_here
   ```

3. **Deploy**:
   ```bash
   git push heroku main
   ```

## Environment Variables Setup

For all platforms, configure these environment variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `OPENAI_API_KEY` | OpenAI API key for AI features | No |
| `NODE_ENV` | Set to "production" | Yes |

## Post-Deployment Steps

1. **Initialize Database**:
   - The database schema will be created automatically on first run
   - Drizzle ORM handles table creation

2. **Test Features**:
   - Visit your deployed URL
   - Test the AI chatbot (if OpenAI key is configured)
   - Create some wellness tips
   - Check recommendations system

3. **Monitor Logs**:
   - Check platform logs for any errors
   - Ensure database connection is successful

## GitHub Actions (Automatic Deployment)

The included GitHub workflow automatically:
- Runs tests on pull requests
- Deploys to production on main branch pushes
- Supports Railway and Render deployment

### Setup Secrets

Add these secrets to your GitHub repository (Settings → Secrets):

- `DATABASE_URL`: Your production database URL
- `OPENAI_API_KEY`: Your OpenAI API key
- `RAILWAY_TOKEN`: Railway deployment token (if using Railway)
- `RENDER_DEPLOY_HOOK`: Render deploy hook URL (if using Render)

## Database Migration

The app uses Drizzle ORM with automatic schema synchronization:
- Tables are created automatically on startup
- No manual migrations needed
- Schema changes are applied via `npm run db:push`

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Ensure all dependencies are in package.json
   - Check Node.js version compatibility

2. **Database Connection**:
   - Verify DATABASE_URL format
   - Ensure database is accessible from your platform

3. **AI Features Not Working**:
   - Check OPENAI_API_KEY is set correctly
   - Verify API key has sufficient credits

### Support

For deployment issues:
1. Check platform-specific logs
2. Verify environment variables
3. Test database connectivity
4. Review GitHub Actions logs (if using CI/CD)