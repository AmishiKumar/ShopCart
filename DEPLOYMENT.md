# Deployment Guide

This guide covers deploying the MERN E-Commerce application to cloud platforms.

## Backend Deployment (Render/Heroku)

### Option 1: Render

1. **Create Account**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create Web Service**
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Select the repository and branch

3. **Configure Service**
   - **Name**: ecommerce-backend
   - **Root Directory**: backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Environment Variables**
   Add these in Render dashboard:
   ```
   MONGO_URI=mongodb+srv://...
   JWT_SECRET=your-secret-key
   SESSION_SECRET=your-session-secret
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-url.com
   PORT=10000
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Copy the service URL

### Option 2: Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login**
   ```bash
   heroku login
   ```

3. **Create App**
   ```bash
   cd backend
   heroku create your-app-name
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set MONGO_URI=your-mongodb-uri
   heroku config:set JWT_SECRET=your-secret
   heroku config:set SESSION_SECRET=your-session-secret
   heroku config:set NODE_ENV=production
   heroku config:set FRONTEND_URL=https://your-frontend-url.com
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

## Frontend Deployment (Vercel/Netlify)

### Option 1: Vercel

1. **Create Account**
   - Go to https://vercel.com
   - Sign up with GitHub

2. **Import Project**
   - Click "New Project"
   - Import your GitHub repository
   - Select the repository

3. **Configure Project**
   - **Framework Preset**: Create React App
   - **Root Directory**: frontend
   - **Build Command**: `npm run build`
   - **Output Directory**: build

4. **Environment Variables**
   ```
   REACT_APP_API_URL=https://your-backend-url.com
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment
   - Copy the deployment URL

### Option 2: Netlify

1. **Create Account**
   - Go to https://netlify.com
   - Sign up with GitHub

2. **New Site from Git**
   - Click "New site from Git"
   - Connect GitHub repository

3. **Build Settings**
   - **Base directory**: frontend
   - **Build command**: `npm run build`
   - **Publish directory**: frontend/build

4. **Environment Variables**
   Add in Site settings → Environment variables:
   ```
   REACT_APP_API_URL=https://your-backend-url.com
   ```

5. **Deploy**
   - Click "Deploy site"
   - Wait for deployment

## Update Frontend API URL

After deploying backend, update frontend to use the production API:

1. Create `frontend/.env.production`:
   ```
   REACT_APP_API_URL=https://your-backend-url.com
   ```

2. Update API calls in frontend to use:
   ```javascript
   const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
   ```

## CORS Configuration

Make sure your backend CORS allows your frontend domain:

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

## MongoDB Atlas for Production

1. **Upgrade Cluster** (if needed)
   - Free tier is fine for development
   - Consider paid tier for production

2. **Update Network Access**
   - Add Render/Heroku IP ranges
   - Or use 0.0.0.0/0 (less secure)

3. **Enable Backups**
   - Set up automated backups
   - Configure retention policy

## Continuous Deployment

Both Render and Vercel support automatic deployments:
- Push to main branch → Auto deploy
- Pull requests → Preview deployments

## Monitoring

1. **Backend Monitoring**
   - Use Render/Heroku logs
   - Set up error tracking (Sentry)
   - Monitor API response times

2. **Database Monitoring**
   - MongoDB Atlas provides metrics
   - Set up alerts for high usage

## SSL/HTTPS

- Render and Vercel provide free SSL certificates
- Automatically enabled for custom domains

## Custom Domains

1. **Backend**
   - Add custom domain in Render/Heroku
   - Update DNS records
   - SSL certificate auto-provisioned

2. **Frontend**
   - Add custom domain in Vercel/Netlify
   - Update DNS records
   - SSL certificate auto-provisioned

## Troubleshooting

### Backend Issues
- Check environment variables
- Verify MongoDB connection
- Check server logs
- Ensure PORT is set correctly

### Frontend Issues
- Verify API URL is correct
- Check CORS settings
- Verify environment variables
- Check browser console for errors

### Database Issues
- Verify MongoDB Atlas connection
- Check IP whitelist
- Verify credentials
- Check cluster status

