# SmartDonum Production Database Setup Guide

## The Problem
Your application works locally with SQLite but fails in production because:
1. Vercel doesn't support SQLite file storage
2. The production environment doesn't have a DATABASE_URL configured
3. API routes fail when trying to connect to the database

## Solutions

### Option 1: Vercel Postgres (Recommended)
1. Go to your Vercel dashboard
2. Select your project
3. Go to "Storage" tab
4. Create a new Postgres database
5. Vercel will automatically set the DATABASE_URL environment variable

### Option 2: External Database Services (Free)
Choose one of these free database providers:

#### Supabase (PostgreSQL)
1. Go to https://supabase.com
2. Create a new project
3. Get the connection string from Settings > Database
4. Set as DATABASE_URL in Vercel environment variables

#### Neon (PostgreSQL)
1. Go to https://neon.tech
2. Create a new project
3. Copy the connection string
4. Set as DATABASE_URL in Vercel environment variables

#### PlanetScale (MySQL) 
1. Go to https://planetscale.com
2. Create a new database
3. Get the connection string
4. Set as DATABASE_URL in Vercel environment variables

## Steps to Deploy:

1. **Update Prisma Schema** (if needed)
   - For PostgreSQL: Change provider to "postgresql" 
   - For MySQL: Change provider to "mysql"

2. **Set Environment Variables in Vercel**
   - Go to Vercel Dashboard > Your Project > Settings > Environment Variables
   - Add: DATABASE_URL = your_connection_string

3. **Update Build Process**
   - The build will automatically generate Prisma client
   - Database tables will be created on first API call

4. **Deploy**
   - Push to GitHub
   - Vercel will automatically deploy with the new database

## Environment Variables Needed:
```
DATABASE_URL="your_production_database_url_here"
```

## Quick Test:
After setting up, try submitting a donation. Check the Vercel function logs to see detailed error messages if it still fails.