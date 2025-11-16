# Error Troubleshooting Guide

## Common Errors and Solutions

### 1. MongoDB Connection Error

**Error Message:**
```
MongoServerError: connect ECONNREFUSED 127.0.0.1:27017
```

**Solutions:**
- **If using local MongoDB:**
  - Make sure MongoDB service is running
  - Windows: Check Services app, start "MongoDB" service
  - Or run: `mongod` in a terminal
  
- **If using MongoDB Atlas:**
  - Update `MONGO_URI` in `backend/.env`
  - Format: `mongodb+srv://username:password@cluster.mongodb.net/ecommerce`
  - Make sure your IP is whitelisted in Atlas Network Access

### 2. Port Already in Use

**Error Message:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solutions:**
- Kill the process using port 5000:
  ```powershell
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  ```
- Or change PORT in `backend/.env` to a different number (e.g., 5001)

### 3. Missing Dependencies

**Error Message:**
```
Cannot find module 'express'
```

**Solutions:**
```powershell
cd backend
npm install

cd ../frontend
npm install
```

### 4. JWT_SECRET Error

**Error Message:**
```
jwt.sign() requires a secret or private key
```

**Solutions:**
- Make sure `backend/.env` has `JWT_SECRET` set
- Should NOT be the default value: `your-super-secret-jwt-key-change-this-in-production`
- Generate a random string for production

### 5. Frontend Build Errors

**Error Message:**
```
Failed to compile
```

**Common Causes:**
- Syntax errors in React components
- Missing imports
- Context provider issues

**Solutions:**
- Check browser console for specific errors
- Check terminal for compilation errors
- Make sure all imports are correct

### 6. CORS Errors

**Error Message:**
```
Access to fetch at 'http://localhost:5000/api/...' from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Solutions:**
- Make sure backend is running
- Check `FRONTEND_URL` in `backend/.env` matches frontend URL
- Verify CORS settings in `backend/server.js`

### 7. Authentication Errors

**Error Message:**
```
Not authorized, no token
```

**Solutions:**
- Make sure user is logged in
- Check if token is stored in localStorage
- Verify token is being sent in Authorization header

### 8. Cart Context Errors

**Error Message:**
```
Cannot read property 'token' of undefined
```

**Solutions:**
- Make sure `CartProvider` is inside `AuthProvider` in `App.jsx`
- Check context imports are correct

## Step-by-Step Error Checking

### Step 1: Check Environment Variables
```powershell
cd backend
node -e "require('dotenv').config(); console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'OK' : 'MISSING'); console.log('MONGO_URI:', process.env.MONGO_URI ? 'OK' : 'MISSING');"
```

### Step 2: Test MongoDB Connection
```powershell
cd backend
node -e "require('dotenv').config(); const mongoose = require('mongoose'); mongoose.connect(process.env.MONGO_URI).then(() => { console.log('✅ MongoDB Connected'); process.exit(0); }).catch(err => { console.log('❌ Error:', err.message); process.exit(1); });"
```

### Step 3: Test Backend Server
```powershell
cd backend
npm run dev
```
Look for:
- ✅ "MongoDB Connected"
- ✅ "Server running on port 5000"
- ❌ Any error messages

### Step 4: Test Frontend
```powershell
cd frontend
npm start
```
Look for:
- ✅ "Compiled successfully!"
- ❌ Any compilation errors

## Quick Fixes

### Reset Everything
```powershell
# Stop all Node processes
taskkill /F /IM node.exe

# Reinstall dependencies
cd backend
rm -r node_modules
npm install

cd ../frontend
rm -r node_modules
npm install
```

### Check All Services
1. MongoDB running? (if using local)
2. Backend server running? (port 5000)
3. Frontend server running? (port 3000)
4. No firewall blocking ports?

## Still Having Issues?

1. Check the exact error message
2. Check which step fails (backend startup, frontend compilation, API calls)
3. Check browser console for frontend errors
4. Check backend terminal for server errors
5. Verify all environment variables are set correctly

