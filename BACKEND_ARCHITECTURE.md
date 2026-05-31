# BACKEND ARCHITECTURE

## Node/Express architecture
- Single Express process in `backend/server.js`.
- Modular route/controller/model layout.
- Stateless JWT authentication model.

## Boot process
1. Load env vars
2. Validate required secrets
3. Connect MongoDB
4. Register security + parsing middleware
5. Attach route modules
6. Attach fallback handlers
7. Listen on configured port

## Middleware chain (order matters)
1. `cors(corsOptions)`
2. `helmet()`
3. JSON/body parsers
4. rate limiters
5. route handlers
6. 404
7. global error handler

## Routing architecture
- `/api/register` and `/api/login` in `authRoutes`.
- `/api/tasks` CRUD in `taskRoutes`, all guarded with `router.use(auth)`.

## Controller-service pattern status
- Controllers currently include both orchestration and business validation.
- No separate service layer yet; acceptable for small codebase, less ideal for growth.

## Authentication and authorization
- Authentication: email/password + bcrypt.
- Token issuance: JWT includes user id/email and 7-day expiry.
- Authorization: task queries always scoped by `user: req.user.id` to enforce tenant isolation.

## Validation pipeline
- Input checks in controllers (required fields, length constraints, enum constraints).
- Mongoose schema constraints add second-line protection.

## Error/logging strategy
- Controller-level try/catch with JSON responses.
- Global error middleware catches unhandled exceptions.
- Console logging only; no structured log sink.

## API design
- RESTful resource paths and HTTP verbs.
- JSON payloads for both success and failure.
- Health endpoint for runtime liveness checks.

## Why Node.js works here
- Excellent fit for IO-heavy API workloads.
- Unified JavaScript stack across client/server boosts developer throughput.
- Async event loop handles many simultaneous lightweight requests.

## Scalability implications
- Horizontal scaling possible because auth state is token-based.
- Bottlenecks will shift to Mongo throughput and CPU-heavy auth operations under high traffic.
- Future improvements: worker separation, queueing, observability, and cache layers.


## Important file walkthrough (line-oriented)
### `server.js`
- Imports establish platform concerns (express/cors/helmet/rate-limit) and DB bootstrap.
- Early env checks intentionally fail-fast to avoid insecure/undefined runtime.
- Rate limiters are mounted on route prefixes before handlers to guard CPU and DB.
- Route mounting delegates feature-specific behavior to modular route files.
- Final middleware order ensures 404s and errors produce consistent JSON responses.

### `controllers/authController.js`
- `register` normalizes email, checks uniqueness, hashes password, persists user.
- `login` verifies identity and issues signed JWT with expiry.
- Side effects: DB reads/writes + token generation + error logging.

### `controllers/taskController.js`
- `createTask` validates title/description/priority then saves task for `req.user.id`.
- `getTasks` builds dynamic query filters from URL params and applies sorting.
- `updateTask` supports partial updates with field-by-field guards.
- `deleteTask` removes only tasks owned by authenticated user.
