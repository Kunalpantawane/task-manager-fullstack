# COMPLETE EXECUTION FLOW

## 1) Server startup lifecycle
1. `backend/server.js` loads env (`dotenv.config()`).
2. Hard fail if `JWT_SECRET` or `MONGO_URI` missing (`process.exit(1)`).
3. `connectDB()` from `config/db.js` opens Mongoose connection.
4. Middleware chain registered in order:
   - `cors(corsOptions)`
   - `helmet()`
   - `express.json()` and `express.urlencoded()`
   - rate limiters (`/api/auth`, `/api`)
5. Routes mount:
   - `/api` -> auth routes
   - `/api/tasks` -> task routes
6. Fallback handlers:
   - `/health`
   - 404
   - global error middleware

## 2) Frontend bootstrap lifecycle
1. Browser loads `public/index.html`.
2. Bundled JS mounts at `#root` from `src/index.js`.
3. `<App/>` initializes router.
4. Route guard checks localStorage token for protected/public redirects.

## 3) Login flow (actual function chain)
1. User submits `Login.jsx` form -> `handleLogin(e)`.
2. `apiClient.post(API_ENDPOINTS.AUTH.LOGIN, { email, password })`.
3. Backend route `/api/login` -> `authController.login`.
4. `User.findOne({email})`, `bcrypt.compare`, `jwt.sign`.
5. Response returns token and user payload.
6. Frontend stores `localStorage.setItem('token', token)` and `navigate('/dashboard')`.

## 4) Dashboard data-fetch flow
1. `Dashboard` mounts; `useEffect` calls `fetchTasks(signal)`.
2. Reads token; if absent navigate `/login`.
3. `GET /api/tasks` with `Authorization: ******
4. Backend `taskRoutes` applies `authMiddleware` first.
5. Middleware verifies JWT and sets `req.user`.
6. `taskController.getTasks` builds query from `completed`, `priority`, `sort` query params.
7. Mongo query executes and returns task array.
8. Frontend sets state, rerenders list.

## 5) Task mutation flow
- **Create**: `createTask` -> `POST /api/tasks` -> validation -> save -> append state.
- **Toggle complete**: `PUT /api/tasks/:id` with `{ completed: !current }` -> replace matching state item.
- **Delete**: `DELETE /api/tasks/:id` -> remove state item.

## Async and event-loop implications
- Node handles concurrent requests through non-blocking I/O; DB calls are awaited promises.
- bcrypt hashing/comparison are async and CPU-heavy relative to normal request logic.
- React state updates schedule rerenders; each resolved API promise triggers a render pass.

## Error propagation
- Controller-level try/catch returns domain messages (400/404/500).
- Uncaught errors bubble to global error middleware.
- Frontend catches Axios errors and surfaces user-visible fallback text.
- 401 from task fetch triggers token removal and redirect.

## Caching/retry logic status
- No server-side caching layer present.
- No automatic client retry strategy configured beyond manual re-trigger by user action.
- Axios timeout is set to 10s; timeout errors are logged by response interceptor.
