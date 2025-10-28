# Production Deployment Guide

## Current Issue
Your APIs work locally but fail in production because:
- **Local**: Uses SQLite database (file-based)
- **Production**: Needs cloud database (SQLite not supported)

## Quick Fix Steps

### 1. Set up Vercel Postgres (Recommended)
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your deployed project
3. Click **"Storage"** tab
4. Click **"Create Database"** → **"Postgres"**
5. Vercel will create a database and provide a `DATABASE_URL`

### 2. Add Environment Variable
1. In your Vercel project, go to **Settings** → **Environment Variables**
2. Add new variable:
   - **Name**: `DATABASE_URL`
   - **Value**: The PostgreSQL URL from step 1 (starts with `postgresql://`)
   - **Environment**: Production

### 3. Update Database Provider
Before deploying, change this in `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"  // Change from "sqlite" to "postgresql"
  url      = env("DATABASE_URL")
}
```

### 4. Redeploy
1. Commit and push your changes
2. Vercel will automatically redeploy
3. The database tables will be created automatically

## Alternative: Supabase (Free)
If you prefer Supabase:
1. Go to [supabase.com](https://supabase.com) → Create project
2. Get the connection string from Settings → Database
3. Add it as `DATABASE_URL` in Vercel environment variables

## Verification
After deployment:
1. Try submitting a donation
2. Check if it appears in the NGO dashboard
3. Check Vercel logs for any errors

## Local Development
Keep your `.env` file unchanged for local development:
```
DATABASE_URL="file:./dev.db"
```

## Troubleshooting
- If still failing: Check Vercel logs under "Functions" tab
- Database connection issues: Verify the `DATABASE_URL` format
- Migration issues: Vercel automatically runs `prisma generate` during build