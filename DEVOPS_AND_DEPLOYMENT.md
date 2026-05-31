# DEVOPS AND DEPLOYMENT

## Current deployment model
The repo is split deployment:
- **Backend** deployed from `/backend` (Render/Railway/Heroku style)
- **Frontend** deployed from `/frontend` (Vercel/Netlify style)

No Dockerfile/docker-compose/CI workflow files are currently committed, so deployment is platform-native via build/start commands.

## Build and runtime commands
- Backend: `npm install`, `npm start`
- Frontend: `npm install`, `npm run build`

## Environment separation
### Backend env
- `PORT`
- `NODE_ENV`
- `MONGO_URI`
- `JWT_SECRET`
- `FRONTEND_URL`

### Frontend env
- `REACT_APP_API_URL`

## Production flow
1. Push code to GitHub
2. Hosting platform pulls repo
3. Build per subdirectory
4. Platform injects env vars
5. Frontend calls backend over HTTPS
6. Backend communicates with MongoDB Atlas

## Reverse proxy/load balancing context
- Managed PaaS products usually provide TLS termination and reverse proxying.
- Horizontal scaling is feasible for backend because auth is stateless JWT.

## Why containers are not mandatory here
For small apps, managed buildpacks simplify operations. Containers become valuable for:
- deterministic runtime parity
- custom OS dependencies
- advanced networking/runtime tuning

## Enterprise enhancements
- Add Dockerfiles + docker-compose for local parity
- Add GitHub Actions CI for lint/test/build gates
- Add staging environment and promotion pipeline
- Add health probes, uptime checks, centralized logging, and rollback automation
