# Fix Production APIs on Vercel Deployment

## Problem
✅ APIs work on `localhost`  
❌ APIs fail on deployed Vercel site  

**Cause**: Vercel can't connect to your local MySQL server (`localhost:3306`)

## Solution: Set up Vercel Postgres (Free)

### Step 1: Create Vercel Postgres Database

1. Go to your **Vercel Dashboard**: https://vercel.com/dashboard
2. Click on your deployed project (`smartdonum`)
3. Go to the **"Storage"** tab at the top
4. Click **"Create Database"**
5. Select **"Postgres"** (free tier available)
6. Click **"Create"**
7. Vercel will automatically create a database and provide a `DATABASE_URL`

### Step 2: Verify Environment Variable

1. In your Vercel project, go to **"Settings"** → **"Environment Variables"**
2. Verify `DATABASE_URL` is automatically added (Vercel does this for you)
3. It should look like: `postgres://default:xxxxx@xxxxx-pooler.us-east-1.postgres.vercel-storage.com/verceldb`

### Step 3: Update Prisma Schema

Your Prisma schema needs to support **PostgreSQL** for production:

**Current** (MySQL):
```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

**Update to** (PostgreSQL):
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### Step 4: Update Local Development Config

Keep MySQL for local, PostgreSQL for production:

**`.env.local`** (for local development with MySQL):
```env
DATABASE_URL="mysql://root:your_password@localhost:3306/smartdonum"
```

**`.env.production`** (Vercel will use this):
```env
# This will be set automatically by Vercel Postgres
# DATABASE_URL="postgresql://..."
```

### Step 5: Redeploy

After Vercel Postgres is set up:

```bash
# Option 1: Push to GitHub (auto-deploys)
git add .
git commit -m "Update for PostgreSQL production database"
git push

# Option 2: Manual deploy
vercel --prod
```

### Step 6: Initialize Database Tables

After deployment, you need to create the tables in your Vercel Postgres database.

**Option A: Use Prisma Migrate** (recommended)
```bash
# This will run on Vercel automatically during build
npx prisma migrate deploy
```

**Option B: Use Prisma Push** (quick setup)
```bash
# Set production DATABASE_URL temporarily
DATABASE_URL="your_vercel_postgres_url" npx prisma db push
```

## Alternative: Use Railway or Supabase

If you prefer other free PostgreSQL hosting:

### Railway (Free tier: 500MB)
1. Go to https://railway.app
2. Create new project → Add PostgreSQL
3. Copy the `DATABASE_URL` connection string
4. Add to Vercel environment variables

### Supabase (Free tier: 500MB)
1. Go to https://supabase.com
2. Create new project
3. Go to Settings → Database → Copy connection string
4. Add to Vercel environment variables

## Testing

After setup:
1. Go to your deployed site
2. Try donating an item (public or organization donor)
3. Check NGO dashboard - donations should appear
4. Check browser console for any errors

## Troubleshooting

**Error: "P1001: Can't reach database server"**
- Check that DATABASE_URL is set in Vercel
- Verify Postgres database is created and running

**Error: "Table doesn't exist"**
- Run database migration: `npx prisma migrate deploy`
- Or push schema: `npx prisma db push`

**Local works, production fails**
- Make sure Prisma provider is `postgresql` not `mysql`
- Verify environment variables in Vercel dashboard

## Summary

🔧 **For Local Development**: Use MySQL (`localhost:3306`)  
☁️ **For Production (Vercel)**: Use Vercel Postgres (cloud database)  
🚀 **Result**: APIs work everywhere!
