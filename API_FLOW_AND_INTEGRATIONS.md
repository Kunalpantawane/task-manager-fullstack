# API FLOW AND INTEGRATIONS

## API surface
Base URL: `http://<backend-host>:5000` (or deployed host)

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| POST | `/api/register` | No | Create user account |
| POST | `/api/login` | No | Authenticate and return JWT |
| GET | `/api/tasks` | Yes | List tasks for current user |
| POST | `/api/tasks` | Yes | Create task |
| PUT | `/api/tasks/:id` | Yes | Update owned task |
| DELETE | `/api/tasks/:id` | Yes | Delete owned task |
| GET | `/health` | No | Liveness check |

## Middleware and processing chain
- Auth endpoints: auth rate limiter -> controller
- Task endpoints: general limiter -> JWT middleware -> controller -> Mongoose

## Request/response payload examples
### Login request
```json
{ "email": "user@example.com", "password": "secret123" }
```
### Login response
```json
{ "token": "<jwt>", "user": { "id": "...", "email": "user@example.com" } }
```

### Create task request
Headers: `Authorization: ******
```json
{ "title": "Write docs", "description": "reverse engineer app", "priority": "high" }
```

### Create task response
```json
{ "_id": "...", "title": "Write docs", "completed": false, "priority": "high", "user": "..." }
```

## Frontend integration flow
- Endpoint constants in `frontend/src/config/api.js`
- Axios used in `Login`, `Register`, `Dashboard`
- JWT stored in localStorage and injected in headers for protected routes

## External integrations
- MongoDB / MongoDB Atlas (database)
- Deployment platforms referenced in docs: Render, Railway, Vercel, Netlify
- No third-party business API integrations currently

## Security concerns per endpoint
- Auth endpoints vulnerable to brute-force without limiter (mitigated via `authLimiter`).
- Task endpoints rely on JWT authenticity + user scoping in query filters.
- Missing schema-level sanitization library and payload-level request validation middleware (e.g., Joi/Zod) for enterprise hardening.
