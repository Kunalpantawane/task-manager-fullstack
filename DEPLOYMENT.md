# Deployment Guide

This guide will help you deploy your TaskMaster application to production.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Backend Deployment](#backend-deployment)
- [Frontend Deployment](#frontend-deployment)
- [Environment Variables](#environment-variables)
- [Post-Deployment](#post-deployment)

---

## Prerequisites

Before deploying, ensure you have:
- [ ] GitHub account with your code pushed
- [ ] MongoDB Atlas account with a cluster set up
- [ ] Backend deployment platform account (Render/Railway/Heroku)
- [ ] Frontend deployment platform account (Vercel/Netlify)

---

## Backend Deployment

### Option 1: Deploy to Render

1. **Create a new Web Service**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure Build Settings**
   ```
   Root Directory: backend
   Build Command: npm install
   Start Command: npm start
   ```

3. **Set Environment Variables**
   ```
   PORT=5000
   NODE_ENV=production
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_strong_random_secret_key
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Copy your backend URL (e.g., `https://taskmaster-api.onrender.com`)

### Option 2: Deploy to Railway

1. **Create a new Project**
   - Go to [railway.app](https://railway.app)
   - Click "New Project" → "Deploy from GitHub repo"

2. **Add MongoDB Plugin** (Optional if using Atlas)
   - Click "New" → "Database" → "MongoDB"
   - Railway will automatically set `MONGO_URL`

3. **Configure Service**
   ```
   Root Directory: /backend
   Start Command: npm start
   ```

4. **Set Environment Variables**
   - Add the same variables as above

---

## Frontend Deployment

### Option 1: Deploy to Vercel

1. **Import Project**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New..." → "Project"
   - Import your GitHub repository

2. **Configure Build Settings**
   ```
   Framework Preset: Create React App
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: build
   Install Command: npm install
   ```

3. **Set Environment Variables**
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment
   - Your app will be live at `https://your-app.vercel.app`

### Option 2: Deploy to Netlify

1. **Create New Site**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"

2. **Configure Build Settings**
   ```
   Base directory: frontend
   Build command: npm run build
   Publish directory: frontend/build
   ```

3. **Set Environment Variables**
   - Go to Site settings → Environment variables
   - Add `REACT_APP_API_URL=https://your-backend-url.onrender.com`

4. **Deploy**
   - Click "Deploy site"

---

## Environment Variables

### Backend (.env)
```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Database (MongoDB Atlas)
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager?retryWrites=true&w=majority

# Authentication
JWT_SECRET=use_a_very_strong_random_32_character_string_here

# Frontend URL (for CORS)
FRONTEND_URL=https://your-frontend-url.vercel.app
```

### Frontend
```env
# API URL
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

---

## MongoDB Atlas Setup

1. **Create a Cluster**
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster

2. **Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0)

3. **Database User**
   - Go to "Database Access"
   - Create a user with a strong password
   - Note the username and password

4. **Get Connection String**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password

---

## Post-Deployment Checklist

### Backend
- [ ] Backend is accessible at the deployment URL
- [ ] Health check endpoint works: `GET /health`
- [ ] MongoDB connection is successful
- [ ] CORS is configured correctly
- [ ] Environment variables are set properly

### Frontend
- [ ] Frontend loads without errors
- [ ] Registration works
- [ ] Login works
- [ ] Tasks can be created, updated, and deleted
- [ ] API calls reach the backend successfully

### Testing
1. **Test Registration**
   ```bash
   curl -X POST https://your-backend.onrender.com/api/register \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"test123456"}'
   ```

2. **Test Login**
   ```bash
   curl -X POST https://your-backend.onrender.com/api/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"test123456"}'
   ```

3. **Test Health Check**
   ```bash
   curl https://your-backend.onrender.com/health
   ```

---

## Troubleshooting

### Backend Issues

**Issue: 500 Internal Server Error**
```
Solution:
1. Check environment variables are set correctly
2. Verify MongoDB connection string
3. Check backend logs for specific errors
```

**Issue: CORS Errors**
```
Solution:
1. Ensure FRONTEND_URL is set in backend .env
2. Check server.js CORS configuration
3. Verify frontend is using correct API URL
```

### Frontend Issues

**Issue: Cannot connect to backend**
```
Solution:
1. Verify REACT_APP_API_URL is set correctly
2. Ensure backend URL doesn't have trailing slash
3. Check browser console for exact error
```

**Issue: Blank page after deployment**
```
Solution:
1. Check for JavaScript errors in browser console
2. Verify build completed successfully
3. Clear browser cache and hard refresh
```

---

## Custom Domain Setup

### For Vercel (Frontend)
1. Go to your project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Configure DNS records as instructed

### For Render (Backend)
1. Go to your service settings
2. Navigate to "Custom Domains"
3. Add your custom domain
4. Configure DNS records as instructed

---

## Continuous Deployment

Both Vercel and Render support automatic deployments:

1. **Enable Auto-Deploy**
   - Vercel and Render auto-deploy on push to main branch
   - Configure branch in platform settings if needed

2. **Preview Deployments**
   - Vercel creates preview deployments for PRs automatically
   - Render can be configured for preview environments

---

## Security Recommendations

- [ ] Use strong, unique JWT_SECRET
- [ ] Enable MongoDB authentication
- [ ] Restrict MongoDB network access
- [ ] Use HTTPS for all connections
- [ ] Implement rate limiting
- [ ] Add security headers (helmet.js)
- [ ] Keep dependencies updated
- [ ] Monitor application logs
- [ ] Set up error tracking (Sentry)

---

## Monitoring

### Recommended Tools
- **Backend**: Render Dashboard, Railway Logs
- **Frontend**: Vercel Analytics
- **Database**: MongoDB Atlas Monitoring
- **Errors**: [Sentry](https://sentry.io)
- **Uptime**: [UptimeRobot](https://uptimerobot.com)

---

## Rollback

If something goes wrong:

### Vercel
1. Go to "Deployments"
2. Find the last working deployment
3. Click "..." → "Promote to Production"

### Render
1. Go to "Events"
2. Find the last successful deploy
3. Click "Rollback"

---

## Support

If you encounter issues:
1. Check the [Troubleshooting](#troubleshooting) section
2. Review deployment platform documentation
3. Open an issue on GitHub
4. Contact support for your hosting platform

---

**Congratulations! Your TaskMaster app is now live! 🎉**
