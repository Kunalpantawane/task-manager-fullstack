# IMPROVEMENT ROADMAP

## Beginner improvements
1. Add backend route tests (auth + task CRUD)
2. Add frontend component tests for login/register/dashboard
3. Align frontend README with current architecture

## Intermediate improvements
1. Add centralized validation middleware (Joi/Zod)
2. Add pagination/query limits on `GET /api/tasks`
3. Add structured logging and request IDs
4. Add CI workflow for test/build/lint

## Advanced improvements
1. Move token storage to HttpOnly cookie + refresh token rotation
2. Add Redis cache for hot reads and rate limiter backend
3. Add OpenTelemetry tracing + dashboards
4. Add role model and permissions framework

## Production-grade improvements
1. Containerize services (Docker) + infra as code
2. Introduce staging/prod promotion pipeline with approvals
3. Add Sentry + uptime monitors + alerting on SLOs
4. Add DB index governance and migration strategy
5. Add WAF/CDN and stronger API abuse protection

## Why these matter
- **Security**: reduces account/session compromise risk.
- **Reliability**: catches regressions before deploy.
- **Scalability**: keeps latency and cost controlled as usage grows.
- **Maintainability**: enables safe team collaboration and faster feature delivery.
