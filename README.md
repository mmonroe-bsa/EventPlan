# EventPlan

Internal event operations application for district camporees.

## Local development

1. Start the database and app:

```bash
docker-compose up --build
```

2. Run migrations and seed:

```bash
npm run prisma:migrate
npm run prisma:seed
```

3. Visit `http://localhost:3000`.

## Health check

`GET /api/health` returns database status.
