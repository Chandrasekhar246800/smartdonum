# SmartDonum

SmartDonum is a donation management platform that connects public donors, organization donors, and NGO teams in one workflow. Donors can submit item donations with image uploads, and NGOs can review, accept, and manage incoming requests from a unified dashboard.

## Highlights

- Multi-role experience for public donors, organization donors, and NGOs
- Donation forms with image upload support
- Gemini-powered image analysis for detected donation materials
- NGO dashboard with donation review, status updates, and material insights
- Modern Next.js App Router setup with TypeScript, Tailwind CSS, and Prisma

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4
- Prisma
- MySQL

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create your local environment file:

```bash
Copy-Item .env.example .env.local
```

3. Fill in the required values in `.env.local`:

- `DATABASE_URL`
- `GEMINI_API_KEY`

4. Generate the Prisma client and sync the schema:

```bash
npx prisma generate
npx prisma db push
```

5. Start the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## Scripts

- `npm run dev` - start the Next.js dev server
- `npm run build` - generate Prisma client and build the app
- `npm run start` - run the production build
- `npm run lint` - run project linting

## Project Structure

- `src/app/page.tsx` - homepage
- `src/app/loginPage/page.tsx` - role-based login entry
- `src/app/publicdonordashboard/` - public donor dashboard flow
- `src/app/organizationdonordashboard/` - organization donor dashboard flow
- `src/app/ngodashboard/page.tsx` - NGO dashboard
- `src/app/api/` - API routes
- `src/components/` - shared UI building blocks
- `prisma/schema.prisma` - database schema

## Environment Notes

- `.env.local` is ignored by Git and should stay local
- Use `.env.example` as the committed reference file for required variables
- Never commit real API keys or database credentials

## Current Data Model

The current Prisma schema stores donations in a single `donation` table with:

- donor type
- donation item category
- status
- flexible JSON details
- creation timestamp

## Before Pushing

Recommended checks:

```bash
npm run lint
npm run build
```

If you hit a local Windows `EPERM` path-resolution issue when running Node-based commands in this workspace, rerun them from a normal terminal outside the current sandboxed environment.
