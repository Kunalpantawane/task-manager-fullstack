# TESTING AND DEBUGGING

## Current testing architecture
- Backend `npm test` is placeholder and fails by design (`Error: no test specified`).
- Frontend uses CRA/Jest stack but currently has no test files.

## Existing validation mechanisms
- Manual functional verification through UI + API calls
- Build-time ESLint checks during `npm run build`

## Baseline observations from this repository
- `backend/npm test` -> intentional failure due missing test implementation.
- `frontend npm test --passWithNoTests` -> succeeds with no tests.
- `frontend npm run build` in CI mode currently fails on hook dependency lint warning in `Dashboard.jsx`.

## Practical debugging workflow for this project
1. Start backend with `npm run dev` and inspect terminal logs.
2. Start frontend with `npm start` and use browser console/network tabs.
3. Validate JWT presence in localStorage.
4. Inspect request headers and payloads in devtools.
5. Use `/health` for backend liveness.
6. Reproduce API directly with curl/Postman to isolate frontend vs backend issues.

## Common failure points
- Missing env vars (`JWT_SECRET`, `MONGO_URI`)
- CORS mismatch (`FRONTEND_URL` misconfigured)
- Expired/invalid JWT in localStorage
- Mongo connectivity issues (Atlas IP whitelist/credentials)
- Frontend lint warnings breaking CI build

## Recommended test expansion
- Backend: Jest + supertest integration tests for auth/task routes.
- Frontend: React Testing Library tests for login/dashboard flows.
- Contract tests for auth and task payload validation.
- End-to-end tests (Playwright/Cypress) for critical user journeys.
