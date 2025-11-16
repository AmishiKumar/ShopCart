@echo off
echo ====================================
echo Testing E-Commerce Project
echo ====================================
echo.

echo [1/4] Checking backend .env file...
if exist backend\.env (
    echo ✅ .env file exists
) else (
    echo ❌ .env file NOT found!
    pause
    exit /b 1
)

echo.
echo [2/4] Testing MongoDB connection...
cd backend
node -e "require('dotenv').config(); const mongoose = require('mongoose'); mongoose.connect(process.env.MONGO_URI).then(() => { console.log('✅ MongoDB OK'); process.exit(0); }).catch(err => { console.log('❌ MongoDB Error:', err.message); process.exit(1); });"
if errorlevel 1 (
    echo.
    echo ❌ MongoDB connection failed!
    echo Make sure MongoDB is running or update MONGO_URI in .env
    cd ..
    pause
    exit /b 1
)

cd ..

echo.
echo [3/4] Checking dependencies...
if exist backend\node_modules (
    echo ✅ Backend dependencies installed
) else (
    echo ❌ Backend dependencies missing - run: cd backend ^&^& npm install
)

if exist frontend\node_modules (
    echo ✅ Frontend dependencies installed
) else (
    echo ❌ Frontend dependencies missing - run: cd frontend ^&^& npm install
)

echo.
echo [4/4] Checking key files...
if exist backend\server.js (
    echo ✅ backend/server.js
) else (
    echo ❌ backend/server.js missing
)

if exist frontend\src\App.jsx (
    echo ✅ frontend/src/App.jsx
) else (
    echo ❌ frontend/src/App.jsx missing
)

echo.
echo ====================================
echo Test Complete!
echo ====================================
echo.
echo To start the project:
echo   1. Backend: cd backend ^&^& npm run dev
echo   2. Frontend: cd frontend ^&^& npm start
echo.
pause

