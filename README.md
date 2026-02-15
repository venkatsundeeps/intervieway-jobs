# Intervieway MVP

Intervieway is a role-specific career assistance platform where candidates select a target role + service and either book directly (if expert exists) or join demand-driven waitlist.

## Stack
- Next.js App Router + TypeScript + Tailwind
- Clerk auth (`/sign-in`)
- Firebase Firestore
- Zod validation in API routes

## Setup
1. Copy env values:
   ```bash
   cp env.example .env.local
   ```
2. Fill Clerk + Firebase + `ADMIN_PASSWORD`.
3. Run app:
   ```bash
   npm install
   npm run dev
   ```

## Seed launch professionals
Seeds 2 initial professionals and 4 services each:
- ReactJS Developer
- ServiceNow Developer

```bash
npm run seed
```

## Routes
- `/` Landing with role/service selector + instant CTA
- `/book` booking/waitlist conversion flow
- `/roles` role directory
- `/roles/[slug]` role details or waitlist fallback
- `/resume-builder` multi-step resume intake
- `/admin?password=...` protected demand dashboard

## APIs
- `POST /api/book`
- `POST /api/resume-intake`
- `GET /api/roles`
- `GET /api/admin/stats?password=...`
- `GET /api/admin/export?password=...`
