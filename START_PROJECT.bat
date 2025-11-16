@echo off
echo ====================================
echo Starting E-Commerce Platform
echo ====================================
echo.

echo Step 1: Starting Backend Server...
echo.
start "Backend Server" cmd /k "cd backend && npm run dev"
timeout /t 3 /nobreak >nul

echo Step 2: Starting Frontend Server...
echo.
start "Frontend Server" cmd /k "cd frontend && npm start"

echo.
echo ====================================
echo Both servers are starting!
echo ====================================
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit this window...
pause >nul

