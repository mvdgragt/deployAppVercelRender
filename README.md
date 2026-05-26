# docker-test

A Node.js + Express + Prisma + PostgreSQL project running fully in Docker.

## Run with one command

```bash
docker compose up
```

That's it. Docker will:
1. Start a PostgreSQL database
2. Run database migrations
3. Start the Express server on http://localhost:3000
4. Start Prisma Studio on http://localhost:5555

## Seed dummy data

To populate the database with dummy data:

```bash
# Make sure the DB is running first
docker compose up postgres_db -d

# Then seed
DATABASE_URL="postgresql://postgres:prisma@localhost:5433/postgres?schema=public" npx prisma db seed
```

## Local development (app outside Docker)

If you want to run the app directly on your machine instead of inside Docker:

1. Copy the example env file:
   ```bash
   cp .env.example .env
   ```
2. Start just the database:
   ```bash
   docker compose up postgres_db -d
   ```
3. Install dependencies and run:
   ```bash
   npm install
   npm run db:deploy
   npm run dev
   ```

## Services

| Service | URL |
|---|---|
| API | http://localhost:3000 |
| Prisma Studio | http://localhost:5555 |
| PostgreSQL | localhost:5433 |
